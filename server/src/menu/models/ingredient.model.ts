import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  Model,
  Column,
  DataType,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Dish } from './dish.model';

@Table({ tableName: 'ingredient' })
export class Ingredient extends Model<Ingredient> {
  @IsNumber()
  @ApiProperty({
    type: 'integer',
    description: 'Авто-инкрементальный ID блюда',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    description: 'Название ингредиента',
    example: 'Масло оливковое',
  })
  @IsString()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    description: 'Состав ингредиента',
    example: '100% оливки',
  })
  @IsString()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  composition: string;

  @ApiProperty({
    description: 'Комментарии к ингредиенту (опционально)',
    example: 'Без консервантов',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  comments?: string;

  @ForeignKey(() => Dish)
  @Column({ type: DataType.INTEGER })
  dishId: number;

  @BelongsTo(() => Dish, 'dishId')
  dish: Dish;
}
