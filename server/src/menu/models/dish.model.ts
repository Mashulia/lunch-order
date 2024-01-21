import {
  Model,
  Column,
  DataType,
  ForeignKey,
  Table,
  BelongsTo,
  HasOne,
} from 'sequelize-typescript';
import { DishGroup } from '../enums';
import { MenuItem } from './menu-item.model';
import { Ingredient } from './ingredients.model';

@Table({ tableName: 'dishes' })
export class Dish extends Model<Dish> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: '',
  })
  name: string;

  @Column({ type: DataType.ENUM(...Object.values(DishGroup)) })
  category: DishGroup;

  @Column({ type: DataType.STRING })
  priceSmallPortion: string;

  @Column({ type: DataType.STRING, allowNull: true })
  priceLargePortion?: string;

  @ForeignKey(() => MenuItem)
  @Column({ type: DataType.INTEGER })
  menuItemId: number;

  @BelongsTo(() => MenuItem, 'menuItemId')
  menu: MenuItem;

  @HasOne(() => Ingredient)
  ingredient: Ingredient;
}
