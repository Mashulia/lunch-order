// ingredient.model.ts

import {
  Model,
  Column,
  DataType,
  ForeignKey,
  Table,
  BelongsTo,
} from 'sequelize-typescript';
import { Dish } from './dish.model';
import { DishGroup } from '../enums';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'ingredients' })
export class Ingredient extends Model<Ingredient> {
  @ApiProperty({
    type: String,
    description: 'Уникальный идентификатор',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({
    type: String,
    description: 'Название блюда',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Категория ингредиентов',
  })
  @Column({
    type: DataType.ENUM(...Object.values(DishGroup)),
    allowNull: false,
  })
  category: DishGroup;

  @ApiProperty({
    type: String,
    description: 'Состав блюда',
  })
  @Column({
    type: DataType.STRING(1000),
    allowNull: false,
  })
  composition: string;

  @ApiProperty({
    type: String,
    description: 'Комментарий к составу',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  comment?: string;

  @ForeignKey(() => Dish)
  @Column({ type: DataType.INTEGER })
  dishId: number;

  @BelongsTo(() => Dish, 'dishId')
  dish: Dish;
}
