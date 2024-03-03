import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './order.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderDto } from './dto/create-order.dto';
import { Op, Sequelize } from 'sequelize';
import { Dish } from 'src/menu/models/dish.model';
import { User } from 'src/users/users.model';
import { startOfWeek, endOfWeek } from 'date-fns';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order) private orderRepository: typeof Order,
    @InjectModel(Dish)
    private dishRepository: typeof Dish,
    @InjectModel(User)
    private userRepository: typeof User,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { userId, dishId, orderDate } = createOrderDto;

    // Попытка найти существующий заказ
    let order = await this.orderRepository.findOne({
      where: {
        userId,
        dishId,
        orderDate,
      },
    });
    // Если заказ не найден, создаем новый
    if (!order) {
      order = await this.orderRepository.create(createOrderDto);
    } else {
      // Если заказ найден, обновляем его
      await this.orderRepository.update(createOrderDto, {
        where: {
          userId,
          dishId,
          orderDate,
        },
      });
      // Получаем обновленную запись
      order = await this.orderRepository.findOne({
        where: {
          userId,
          dishId,
          orderDate,
        },
      });
    }
    return order;
  }

  async updateOrder(
    id: number,
    updateOrderDto: Partial<UpdateOrderDto>,
  ): Promise<Order[]> {
    const order = await this.orderRepository.findOne({
      where: {
        userId: id,
        dishId: updateOrderDto.dishId,
        orderDate: updateOrderDto.orderDate,
      },
    });

    if (!order) {
      throw new NotFoundException(`Order was not found`);
    }
    console.log(updateOrderDto.qty);
    if (updateOrderDto.isSmall) {
      order.smallPortionQty = Number(updateOrderDto.qty);
    } else {
      order.bigPortionQty = Number(updateOrderDto.qty);
    }
    await order.save();
    return this.getAllOrdersByUserId(id);
  }

  async getAllOrdersByUserId(id: number): Promise<Order[]> {
    // const now = new Date();
    // const start = startOfWeek(now, { weekStartsOn: 1 }); // Начало недели (понедельник)
    // const end = endOfWeek(now, { weekStartsOn: 1 }); // Конец недели (воскресенье)
    const orders = await this.orderRepository.findAll({
      where: { userId: id },
      //   orderDate: {
      //     [Op.gte]: start, // orderDate >= начало недели
      //     [Op.lte]: end, // orderDate <= конец недели
      //   },
      include: [
        {
          model: Dish,
          as: 'dish',
        },
      ],
    });
    return orders;
  }

  async deleteOrder(id: number, data: any): Promise<Order[]> {
    console.log(id, data);
    await this.orderRepository.destroy({ where: { dishId: data.dishId } });

    // Обновленный список заказов после удаления текущего заказа
    const updatedOrders = await this.getAllOrdersByUserId(id);
    return updatedOrders;
  }

  async getAllOrders(): Promise<Order[]> {
    const orders = await this.orderRepository.findAll({
      include: [
        {
          model: Dish,
          as: 'dish',
        },
        {
          model: User,
          as: 'user',
        },
      ],
    });
    return orders;
  }

  //   async getUserOrdersForWeek(userId: number, startDate: Date) {
  //     const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
  //     const orders = await this.orderRepository.findAll({
  //       where: {
  //         userId,
  //         orderDate: {
  //           [Op.gte]: startDate,
  //           [Op.lt]: endDate,
  //         },
  //       },
  //       include: [
  //         {
  //           model: Dish,
  //           required: true,
  //           where: { id: Sequelize.col('Order.dishId') },
  //         },
  //       ],
  //     });

  //     const formattedOrders = await Promise.all(
  //       orders.map(async (order) => {
  //         const dish = await this.dishRepository.findByPk(order.dishId);
  //         const orderWithDish = {
  //           id: order.id,
  //           orderDate: order.orderDate,
  //           smallPortionQty: order.smallPortionQty,
  //           bigPortionQty: order.bigPortionQty,
  //           dish: dish,
  //           userId: order.userId,
  //           createdAt: order.createdAt,
  //           updatedAt: order.updatedAt,
  //         };
  //         return orderWithDish;
  //       }),
  //     );

  //     return formattedOrders;
  //   }

  //   async getUserOrdersForCurrentDateByName(
  //     firstName: string,
  //     lastName: string,
  //     currentDate: string,
  //   ) {
  //     const user = await this.userRepository.findOne({
  //       where: {
  //         firstName,
  //         lastName,
  //       },
  //     });

  //     if (!user) {
  //       return [];
  //     }
  //     const orders = await this.orderRepository.findAll({
  //       where: {
  //         userId: user.id,
  //         orderDate: currentDate,
  //       },
  //       include: [
  //         {
  //           model: Dish,
  //           attributes: {
  //             exclude: ['menuItemId'],
  //           },
  //         },
  //       ],
  //       attributes: {
  //         exclude: ['userId'],
  //       },
  //     });
  //     const formattedOrders = await Promise.all(
  //       orders.map(async (order) => {
  //         const orderWithDish = {
  //           id: order.id,
  //           orderDate: order.orderDate,
  //           smallPortionQty: order.smallPortionQty,
  //           bigPortionQty: order.bigPortionQty,
  //           dish: order.dish,
  //           createdAt: order.createdAt,
  //           updatedAt: order.updatedAt,
  //         };
  //         return orderWithDish;
  //       }),
  //     );

  //     return formattedOrders;
  //   }
}
