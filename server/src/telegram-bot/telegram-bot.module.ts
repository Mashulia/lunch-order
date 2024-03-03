import { Module } from '@nestjs/common';
import { TelegramBotService } from './telegram-bot.service';
import { TelegramBotController } from './telegram-bot.controller';
import { OrderService } from 'src/order/order.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from 'src/order/order.model';
import { Dish } from 'src/menu/models/dish.model';
import { User } from 'src/users/users.model';

@Module({
  providers: [TelegramBotService, OrderService],
  controllers: [TelegramBotController],
  imports: [SequelizeModule.forFeature([Order, Dish, User])],
})
export class TelegramBotModule {}
