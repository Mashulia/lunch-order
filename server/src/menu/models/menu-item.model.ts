import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { Menu } from './menu.model';
import { DayOfWeek } from '../enums';
import { Dish } from './dish.model';

@Table({ tableName: 'menuItems' })
export class MenuItem extends Model<MenuItem> {
  @ApiProperty()
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  menuItemId: number;

  @ApiProperty()
  @Column({ type: DataType.STRING })
  date: string;

  @ApiProperty()
  @Column(DataType.ENUM(...Object.values(DayOfWeek)))
  dayOfWeek: DayOfWeek;

  @HasMany(() => Dish)
  dishes: Dish[];

  @ForeignKey(() => Menu)
  @Column({ type: DataType.INTEGER })
  menuId: number;
}
