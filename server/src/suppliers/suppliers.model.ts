import { ApiProperty } from '@nestjs/swagger';
import { HasMany, Model, Column, DataType, Table } from 'sequelize-typescript';
import { Menu } from 'src/menu/models/menu.model';

interface SupplierCreationAttrs {
  name: string;
}

@Table({ tableName: 'suppliers' })
export class Supplier extends Model<Supplier, SupplierCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'ООО "БизнесТайм"',
    description: 'Название поставщика',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @HasMany(() => Menu)
  menus: Menu[];
}
