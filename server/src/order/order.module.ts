import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './order.model';
import { Dish } from 'src/menu/models/dish.model';
import { User } from 'src/users/users.model';

@Module({
  controllers: [OrderController],
  imports: [SequelizeModule.forFeature([Order, Dish, User])],
  providers: [OrderService],
})
export class OrderModule {}
