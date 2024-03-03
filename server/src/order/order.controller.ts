import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { Order } from './order.model';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { UserRole } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('Заказы')
@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    @Inject('OrderRepository')
    private orderRepository: typeof Order,
  ) {}

  //   @Get()
  //   getAllOrders() {
  //     return this.orderService.getAllOrders();
  //   }
  @ApiOperation({ summary: 'Получить заказы текущего пользователя' })
  @ApiResponse({ status: 200, type: [Order] })
  @Get(':id')
  getOrdersById(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.getAllOrdersByUserId(id);
  }

  @ApiOperation({ summary: 'Создать заказ' })
  @Post()
  @UsePipes(ValidationPipe)
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @ApiOperation({ summary: 'Обновить заказ' })
  @Patch(':id')
  @UsePipes(ValidationPipe)
  updateOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: Partial<UpdateOrderDto>,
  ) {
    return this.orderService.updateOrder(id, updateOrderDto);
  }

  @ApiOperation({ summary: 'Удалить заказ' })
  @Delete(':id')
  deleteOrder(@Param('id', ParseIntPipe) id: number, @Body() dishId: number) {
    return this.orderService.deleteOrder(id, dishId);
  }

  @ApiOperation({ summary: 'Получить все заказы пользователей' })
  @Roles(UserRole.MANAGER)
  @UseGuards(RolesGuard)
  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Найденные записи',
    type: [Order],
  })
  async getAllOrders(@Res() res) {
    const orders = await this.orderService.getAllOrders();
    return res.status(HttpStatus.OK).json(orders);
  }
}
