import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Menu } from './models/menu.model';
import { MenuItem } from './models/menu-item.model';
import { Dish } from './models/dish.model';
import { Ingredient } from './models/ingredient.model';
import { User } from 'src/users/users.model';
import { UsersModule } from 'src/users/users.module';
import { RolesModule } from 'src/roles/roles.module';
import { OrderModule } from 'src/order/order.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [MenuService],
  controllers: [MenuController],
  imports: [
    SequelizeModule.forFeature([Menu, MenuItem, Dish, Ingredient, User]),
    OrderModule,
    UsersModule,
    RolesModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  exports: [MenuService],
})
export class MenuModule {}
