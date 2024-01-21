import * as xlsx from 'xlsx';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Menu } from './models/menu.model';
import { Dish } from './models/dish.model';
import { DayOfWeek, DishGroup } from './enums';
import { MenuItem } from './models/menu-item.model';
import { InjectModel } from '@nestjs/sequelize';
import { Supplier } from 'src/suppliers/suppliers.model';
import { CreateMenuItemDto, CreateDishDto } from './dto/create-menu.dto';
import { Ingredient } from './models/ingredients.model';
import { Op } from 'sequelize';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(Supplier)
    private readonly supplierRepository: typeof Supplier,
    @InjectModel(Menu)
    private readonly menuRepository: typeof Menu,
    @InjectModel(Ingredient)
    private readonly ingredientRepository: typeof Ingredient,
    @InjectModel(Dish)
    private readonly dishRepository: typeof Dish,
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
        menuItems: menuItems as MenuItem[],
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

  async saveIngridientsToDataBase(fileBuffer: Buffer, sheetName: string) {
    const ingredientsData = await this.getSheetData(fileBuffer, sheetName);

    let dishGroup;
    for (let i = 0; i < ingredientsData.length; i++) {
      const row = Object.values(ingredientsData[i]);
      if (!row[0]) {
        continue;
      }
      if (this.isGroupDish(row[0].trim() as DishGroup)) {
        dishGroup = row[0];
        continue;
      } else {
        let compositionComments = '';
        if (row[2]) {
          compositionComments = row[2];
        }

        // Проверка существования ингредиента по названию
        const existingIngredient = await this.ingredientRepository.findOne({
          where: {
            name: {
              [Op.like]: `%${row[0]}%`,
            },
          },
        });

        if (!existingIngredient) {
          const ingredientItem = {
            name: row[0],
            category: dishGroup,
            composition: row[1],
            comments: compositionComments,
          };

          await this.ingredientRepository.create(ingredientItem);
        }
      }
    }
  }

  async readMenuFromExcel(fileBuffer: Buffer, supplierId: number) {
    const sheetMenuName = 'вспомогательный';
    const sheetIngredientsName = 'составы';

    await this.saveMenuToDataBase(fileBuffer, supplierId, sheetMenuName);

    await this.saveIngridientsToDataBase(fileBuffer, sheetIngredientsName);
  }

  async getCurrentMenuWithIngredients(): Promise<Menu[]> {
    try {
      const currentMenus = await this.menuRepository.findAll({
        order: [['createdAt', 'DESC']],
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
                    as: 'ingredients',
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
}
