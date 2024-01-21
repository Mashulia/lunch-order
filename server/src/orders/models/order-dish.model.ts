// order-dish.model.ts
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { EmployeeOrder } from './order.model';
import { Dish } from 'src/menu/models/dish.model';

@Table({ tableName: 'order_dishes' })
export class OrderDish extends Model<OrderDish> {
  @ForeignKey(() => EmployeeOrder)
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  orderId: number;

  @ForeignKey(() => Dish)
  @Column({ type: DataType.INTEGER })
  dishId: number;

  @Column({ type: DataType.INTEGER })
  portionCount: number;

  @BelongsTo(() => EmployeeOrder, 'orderId')
  order: EmployeeOrder;

  @BelongsTo(() => Dish, 'dishId')
  dish: Dish;
}
