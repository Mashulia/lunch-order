import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './order.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderDto } from './dto/create-order.dto';
import { Dish } from 'src/menu/models/dish.model';
import { User } from 'src/users/users.model';
import { UpdateOrderDto } from './dto/update-order.dto';
@Injectable()
export class OrderService {
  constructor(@InjectModel(Order) private orderRepository: typeof Order) {}

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
    const orders = await this.orderRepository.findAll({
      where: { userId: id },
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

  async getCurrentDayOrderByUserId(userId) {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${String(currentDate.getFullYear()).slice(-2)}`;
    const order = await Order.findAll({
      where: {
        userId,
        orderDate: '12/11/23',
      },
      include: [
        {
          model: User,
          attributes: ['firstName', 'lastName', 'middleName'],
        },
        {
          model: Dish,
        },
      ],
    });
    return order;
  }

  getCurrentDateFormatted() {
    const currentDate = new Date();

    const daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const dayOfWeek = daysOfWeek[currentDate.getDay()];

    const year = String(currentDate.getFullYear()).slice(-2);
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    return `📅 ${day}.${month}.${year}, ${dayOfWeek}`;
  }

  async formatOrderForTelegram(orderData) {
    const date = this.getCurrentDateFormatted();
    let title = '';
    const dishes = [];
    let summary = 0;
    orderData.forEach((order) => {
      title = `🍽️ Меню для ${order.user.lastName} ${order.user.firstName[0]}${order.user.middleName[0]}`;
      const isSmallQty = order.smallPortionQty > 0;
      const isBigQty = order.bigPortionQty > 0;
      const smallDish = isSmallQty
        ? `${order.smallPortionQty} X ${order.dish.name} (М) (${order.dish.priceSmallPortion} руб.)\n`
        : '';
      const bigDish = isBigQty
        ? `${order.largePortionQty} X ${order.dish.name} (Б) (${order.dish.priceLargePortion} руб.)\n`
        : '';
      if (smallDish) {
        dishes.push(smallDish);
        summary += Number(order.dish.priceSmallPortion) * order.smallPortionQty;
      }
      if (bigDish) {
        dishes.push(bigDish);
        summary += Number(order.dish.priceLargePortion) * order.largePortionQty;
      }
    });

    const reply = `${date}\n${title}\n${dishes.join('\r')}\n💲${summary} руб.`;

    return reply;
  }
}
