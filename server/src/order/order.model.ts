import {
  Model,
  Column,
  DataType,
  ForeignKey,
  Table,
  BelongsTo,
} from 'sequelize-typescript';
import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Dish } from 'src/menu/models/dish.model';
import { User } from 'src/users/users.model';

@Table({ tableName: 'orders' })
export class Order extends Model<Order> {
  @IsNumber()
  @ApiProperty({
    type: 'integer',
    description: 'Авто-инкрементальный ID заказа',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @IsString()
  @ApiProperty({
    type: 'string',
    description: 'Дата заказа',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  orderDate: string;

  @IsNumber()
  @ApiProperty({
    type: 'number',
    description: 'Количество порций',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  smallPortionQty?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  bigPortionQty?: number;

  @ForeignKey(() => Dish)
  @Column({ type: DataType.INTEGER })
  dishId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => Dish, { foreignKey: 'dishId', as: 'dish' })
  dish: Dish;

  @BelongsTo(() => User, 'userId')
  user: User;
}
