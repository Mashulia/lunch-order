import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/roles/roles.enum';
import { User } from 'src/users/users.model';
import { CreateOrderDto } from './create-order.dto';
import { EmployeeOrder } from './models/order.model';
import { OrdersService } from './orders.service';

@ApiTags('Заказы')
@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @ApiOperation({ summary: 'Создание заказа' })
  @Post()
  @Roles(UserRole.EMPLOYEE)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createOrder(
    @Body() orderData: CreateOrderDto,
    @CurrentUser() user: User,
  ): Promise<EmployeeOrder> {
    orderData.userId = user.id;
    orderData.id = user.id;
    const order = await this.orderService.createOrder(orderData);
    return order;
  }
}
