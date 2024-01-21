import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { Menu } from './menu/models/menu.model';
import { MenuItem } from './menu/models/menu-item.model';
import { SuppliersModule } from './suppliers/suppliers.module';
import { Supplier } from './suppliers/suppliers.model';
import { EmployeeOrder } from './orders/models/order.model';
import { MenuModule } from './menu/menu.module';
import { Dish } from './menu/models/dish.model';
import { OrdersModule } from './orders/orders.module';
import { OrderDish } from './orders/models/order-dish.model';
import { Ingredient } from './menu/models/ingredients.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
      models: [
        User,
        Role,
        UserRoles,
        Menu,
        MenuItem,
        Dish,
        Ingredient,
        Supplier,
        EmployeeOrder,
        OrderDish,
      ],
      autoLoadModels: true,
      synchronize: true,
    }),
    MulterModule.register({ dest: './uploads' }),
    UsersModule,
    RolesModule,
    AuthModule,
    MenuModule,
    SuppliersModule,
    OrdersModule,
  ],
})
export class AppModule {}
