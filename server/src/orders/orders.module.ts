import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeeOrder } from './models/order.model';
import { RolesModule } from 'src/roles/roles.module';
import { User } from 'src/users/users.model';
import { Role } from 'src/roles/roles.model';
import { JwtModule } from '@nestjs/jwt';
import { OrderDish } from './models/order-dish.model';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    SequelizeModule.forFeature([EmployeeOrder, OrderDish, User, Role]),
    RolesModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
})
export class OrdersModule {}
