import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Supplier } from './suppliers.model';
import { CreateSupplierDto } from './dto/create-suppliers.dto';

@Injectable()
export class SupplierService {
  constructor(
    @InjectModel(Supplier)
    private readonly supplierRepository: typeof Supplier,
  ) {}

  async createSupplier(
    createSupplierDto: CreateSupplierDto,
  ): Promise<Supplier> {
    return this.supplierRepository.create(createSupplierDto);
  }

  async deleteSupplier(supplierId: number): Promise<void> {
    await this.supplierRepository.destroy({ where: { id: supplierId } });
  }

  async getAllSuppliers(): Promise<Supplier[]> {
    return this.supplierRepository.findAll();
  }
}
