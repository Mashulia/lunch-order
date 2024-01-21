// orders.service.ts
import { Injectable } from '@nestjs/common';
import { EmployeeOrder } from './models/order.model';
import { CreateOrderDto } from './create-order.dto';
import { OrderDish } from './models/order-dish.model';

@Injectable()
export class OrdersService {
  async createOrder(orderData: CreateOrderDto): Promise<EmployeeOrder> {
    const { orderDishes, ...orderWithoutDishes } = orderData;

    const order = await EmployeeOrder.create(orderWithoutDishes, {
      include: [OrderDish],
    });

    const orderDishInstances = await OrderDish.bulkCreate(
      orderDishes.map((dish) => ({ ...dish, orderId: order.id })),
    );

    await order.$set('orderDishes', orderDishInstances);

    return order;
  }
}
