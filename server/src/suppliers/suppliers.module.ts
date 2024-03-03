import { Module } from '@nestjs/common';
import { Supplier } from './suppliers.model';
import { SupplierService } from './suppliers.service';
import { SupplierController } from './suppliers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesModule } from 'src/roles/roles.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Supplier]),
    RolesModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  providers: [SupplierService],
  controllers: [SupplierController],
  exports: [SupplierService],
})
export class SuppliersModule {}
