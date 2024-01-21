import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Menu } from './models/menu.model';
import { MenuItem } from './models/menu-item.model';
import { Dish } from './models/dish.model';
import { Supplier } from 'src/suppliers/suppliers.model';
import { SuppliersModule } from 'src/suppliers/suppliers.module';
import { User } from 'src/users/users.model';
import { UsersModule } from 'src/users/users.module';
import { RolesModule } from 'src/roles/roles.module';
import { Ingredient } from './models/ingredients.model';

@Module({
  providers: [MenuService],
  controllers: [MenuController],
  imports: [
    SequelizeModule.forFeature([
      Menu,
      MenuItem,
      Dish,
      Supplier,
      User,
      Ingredient,
    ]),
    SuppliersModule,
    UsersModule,
    RolesModule,
  ],
})
export class MenuModule {}
