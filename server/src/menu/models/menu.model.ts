import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { MenuItem } from './menu-item.model';
import { Supplier } from 'src/suppliers/suppliers.model';

@Table({ tableName: 'menus' })
export class Menu extends Model<Menu> {
  @ApiProperty()
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  menuId: number;

  @ForeignKey(() => Supplier)
  @Column({ type: DataType.INTEGER })
  supplierId: number;

  @BelongsTo(() => Supplier)
  supplier: Supplier;

  @HasMany(() => MenuItem)
  menuItems: MenuItem[];
}
