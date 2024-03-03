import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Menu } from './models/menu.model';
import { MenuItem } from './models/menu-item.model';
import { Dish } from './models/dish.model';
import { Ingredient } from './models/ingredient.model';
import { Supplier } from 'src/suppliers/suppliers.model';
import { SuppliersModule } from 'src/suppliers/suppliers.module';
import { User } from 'src/users/users.model';
import { UsersModule } from 'src/users/users.module';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  providers: [MenuService],
  controllers: [MenuController],
  imports: [
    SequelizeModule.forFeature([
      Menu,
      MenuItem,
      Dish,
      Ingredient,
      Supplier,
      User,
    ]),
    SuppliersModule,
    UsersModule,
    RolesModule,
  ],
  exports: [MenuService],
})
export class MenuModule {}
