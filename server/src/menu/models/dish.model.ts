import {
  Model,
  Column,
  DataType,
  ForeignKey,
  Table,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { DishGroup } from '../enums';
import { Ingredient } from './ingredient.model';
import { MenuItem } from './menu-item.model';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/order/order.model';
// import { OrderDish } from 'src/orders/models/order-dish.model';open-api-spec.interface';

@Table({ tableName: 'dishes' })
export class Dish extends Model<Dish> {
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

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    type: 'integer',
    description: 'Количество маленьких порций',
  })
  @Column({ type: DataType.INTEGER })
  smallPortionQty?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    type: 'integer',
    description: 'Количество больших порций',
  })
  @Column({ type: DataType.INTEGER })
  bigPortionQty?: number;

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Название блюда',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: '',
  })
  name: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    enum: DishGroup,
    description: 'Категория блюда',
  })
  @Column({ type: DataType.ENUM(...Object.values(DishGroup)) })
  category: DishGroup;

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Цена за маленькую порцию блюда',
  })
  @Column({ type: DataType.STRING })
  priceSmallPortion: string;

  @IsString()
  @ApiProperty({
    type: 'string',
    nullable: true,
    description: 'Цена за большую порцию блюда (опционально)',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  priceLargePortion?: string;

  @IsNumber()
  @ApiProperty({
    type: 'integer',
    description: 'ID связанного элемента меню',
  })
  @ForeignKey(() => MenuItem)
  @Column({ type: DataType.INTEGER })
  menuItemId: number;

  @BelongsTo(() => MenuItem, 'menuItemId')
  menu: MenuItem;

  @HasMany(() => Ingredient)
  ingredient: Ingredient[];

  @HasMany(() => Order, 'dishId')
  orders: Order[];
}
