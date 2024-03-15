import { Injectable } from '@nestjs/common';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class SummaryService {
  constructor(private readonly orderServise: OrderService) {}

  async summarizeOrdersByUser() {
    const orders = await this.orderServise.getAllOrders();
    const userOrdersSummary = orders.reduce((acc, order) => {
      const userId = order.user.id;
      const dayOfWeek = new Date(order.orderDate).getDay();
      console.log(dayOfWeek);
      if (!acc[userId]) {
        acc[userId] = {
          user: `${order.user.firstName} ${order.user.lastName[0]} ${order.user.middleName[0]}`,
          menuOrder: Array(6).fill(0),
          total: 0,
        };
      }

      const smallPrice =
        order.smallPortionQty * Number(order.dish.priceSmallPortion) ?? 0;
      const bigPrice =
        order.bigPortionQty * Number(order.dish.priceLargePortion) ?? 0;
      acc[userId].menuOrder[dayOfWeek] += smallPrice + bigPrice;
      console.log(acc[userId].menuOrder[dayOfWeek]);
      return acc;
    }, {});

    Object.values(userOrdersSummary).forEach((summary: any) => {
      summary.total = summary.menuOrder.reduce((sum, value) => sum + value, 0);
    });
    return Object.values(userOrdersSummary);
  }
}
