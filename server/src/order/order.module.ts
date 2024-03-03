import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './order.model';
import { RolesModule } from 'src/roles/roles.module';
import { JwtModule } from '@nestjs/jwt';
import { MenuModule } from 'src/menu/menu.module';
import { UsersModule } from 'src/users/users.module';
@Module({
  controllers: [OrderController],
  imports: [
    SequelizeModule.forFeature([Order]),
    RolesModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  exports: [OrderService],
  providers: [OrderService],
})
export class OrderModule {}
