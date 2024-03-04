import * as xlsx from 'xlsx';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Menu } from './models/menu.model';
import { Dish } from './models/dish.model';
import { Ingredient } from './models/ingredient.model';
import { DayOfWeek, DishGroup } from './enums';
import { MenuItem } from './models/menu-item.model';
import { InjectModel } from '@nestjs/sequelize';
import { OrderService } from 'src/order/order.service';
import {
  CreateMenuItemDto,
  CreateDishDto,
  CreateIngredientDto,
} from './dto/create-menu.dto';
import { Op } from 'sequelize';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(Menu)
    private readonly menuRepository: typeof Menu,
    @InjectModel(Dish)
    private readonly dishRepository: typeof Dish,
    @InjectModel(Ingredient)
    private readonly ingredientRepository: typeof Ingredient,
    private readonly orderServise: OrderService,
  ) {}

  isDayOfWeek(value: DayOfWeek): boolean {
    return Object.values(DayOfWeek).includes(value);
  }

  isGroupDish(value: DishGroup): boolean {
    return Object.values(DishGroup).includes(value);
  }

  async getSheetData(fileBuffer: Buffer, sheetName: string) {
    const workbook = xlsx.read(fileBuffer, { sheetStubs: true });
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, {
      header: 3,
      defval: null,
      raw: false,
    });
    return data;
  }

  async findDishByIngredientName(ingredient: CreateIngredientDto) {
    const existingDishes = await this.dishRepository.findAll({
      where: {
        name: {
          [Op.like]: `%${ingredient.name}%`,
        },
      },
    });
    if (!existingDishes) {
      throw new NotFoundException(
        `Dish with name ${ingredient.name} not found`,
      );
    }
    return existingDishes;
  }

  async saveMenuToDataBase(
    fileBuffer: Buffer,
    supplierId: number,
    sheetName: string,
  ) {
    const menuItems: CreateMenuItemDto[] = [];
    let menuItemId = 0;
    let currentMenuItem: CreateMenuItemDto | undefined;
    const menuData = await this.getSheetData(fileBuffer, sheetName);

    let dishGroup;
    for (let i = 0; i < menuData.length; i++) {
      const row = Object.values(menuData[i]);
      if (!row[0] || row[0] === 'Скидка / Стоимость доставки для клиента:') {
        continue;
      }

      if (this.isDayOfWeek(row[0].trim() as DayOfWeek)) {
        if (currentMenuItem) {
          menuItems.push(currentMenuItem);
        }

        currentMenuItem = {
          date: row[1] as string,
          dayOfWeek: row[0] as DayOfWeek,
          dishes: [],
        };
        menuItemId++;
        continue;
      }
      if (this.isGroupDish(row[0].trim() as DishGroup)) {
        dishGroup = row[0];
        continue;
      }
      if (row[0] && row[0] != 'Суббота' && row[0] != 'Воскресенье') {
        const dish: CreateDishDto = {
          name: row[0],
          category: dishGroup,
          priceSmallPortion: row[1],
          priceLargePortion: row[2],
          menuItemId: menuItemId,
          ingredients: [] as CreateIngredientDto[],
        };

        currentMenuItem?.dishes.push(dish);
      } else {
        continue;
      }
    }

    if (currentMenuItem) {
      menuItems.push(currentMenuItem);
    }

    await this.menuRepository.create(
      {
        supplierId: supplierId,
        menuItems: menuItems as unknown as MenuItem[],
      },
      {
        include: [
          {
            model: MenuItem,
            as: 'menuItems',
            include: [
              {
                model: Dish,
                as: 'dishes',
              },
            ],
          },
        ],
      },
    );
  }

  async saveIngredientsToDataBase(fileBuffer: Buffer, sheetName: string) {
    const ingredientsData = await this.getSheetData(fileBuffer, sheetName);
    for (let i = 0; i < ingredientsData.length; i++) {
      const row = Object.values(ingredientsData[i]);

      if (this.isGroupDish(row[0].trim() as DishGroup)) {
        continue;
      }
      const ingredient: CreateIngredientDto = {
        name: row[0],
        composition: row[1],
        comments: row[2],
      };
      const existingDishes = await this.findDishByIngredientName(ingredient);
      if (existingDishes?.length > 0) {
        for (const existingDish of existingDishes) {
          try {
            await this.ingredientRepository.create({
              name: ingredient.name,
              composition: ingredient.composition,
              comments: ingredient.comments,
              dishId: existingDish.id,
            });
          } catch (error) {
            console.error(error.message);
          }
        }
      }
    }
  }

  async readMenuFromExcel(fileBuffer: Buffer, supplierId: number) {
    const sheetMenuName1 = 'вспомогательный';
    const sheetMenuName2 = 'составы';

    await this.saveMenuToDataBase(fileBuffer, supplierId, sheetMenuName1);
    await this.saveIngredientsToDataBase(fileBuffer, sheetMenuName2);
  }

  async getCurrentMenuWithIngredients(): Promise<Menu[]> {
    try {
      const currentMenus = await this.menuRepository.findAll({
        order: [['createdAt', 'DESC']],
        limit: 1,
        include: [
          {
            model: MenuItem,
            as: 'menuItems',
            include: [
              {
                model: Dish,
                as: 'dishes',
                include: [
                  {
                    model: Ingredient,
                    as: 'ingredient',
                  },
                ],
              },
            ],
          },
        ],
      });

      if (!currentMenus || currentMenus.length === 0) {
        throw new NotFoundException('Current menu not found');
      }

      return currentMenus;
    } catch (error) {
      throw new NotFoundException(
        `Error finding current menu: ${error.message}`,
      );
    }
  }

  async getCurrentMenuWithIngredientsAndOrderedPortions(
    userId: number,
  ): Promise<Menu[]> {
    try {
      // Получаем текущее меню
      const currentMenus = await this.menuRepository.findAll({
        order: [['createdAt', 'DESC']],
        limit: 1,
        include: [
          {
            model: MenuItem,
            as: 'menuItems',
            include: [
              {
                model: Dish,
                as: 'dishes',
                include: [
                  {
                    model: Ingredient,
                    as: 'ingredient',
                  },
                ],
              },
            ],
          },
        ],
      });

      if (!currentMenus || currentMenus.length === 0) {
        throw new NotFoundException('Current menu not found');
      }
      // Получаем заказы пользователя
      const userOrders = await this.orderServise.getAllOrdersByUserId(userId);
      console.log(userOrders);
      // Проходимся по каждому блюду в текущем меню
      for (const menu of currentMenus) {
        for (const menuItem of menu.menuItems) {
          for (const dish of menuItem.dishes) {
            // Находим заказы пользователя для этого блюда
            const userOrdersForDish = userOrders.filter((order) => {
              return order.dishId === dish.id;
            });
            if (userOrdersForDish.length) {
              userOrdersForDish.forEach((userOrder) => {
                dish.smallPortionQty = userOrder.smallPortionQty;
                dish.bigPortionQty = userOrder.bigPortionQty;
              });
            }
            dish.save();
          }
        }
      }

      return currentMenus;
    } catch (error) {
      throw new NotFoundException(
        `Error finding current menu: ${error.message}`,
      );
    }
  }
}
