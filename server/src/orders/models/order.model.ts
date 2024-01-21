// employee-order.model.ts
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { OrderDish } from './order-dish.model';
import { User } from 'src/users/users.model';

@Table({ tableName: 'employee_orders' })
export class EmployeeOrder extends Model<EmployeeOrder> {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  orderDate: string;

  @HasMany(() => OrderDish)
  orderDishes: OrderDish[];

  @BelongsTo(() => User)
  employee: User;
}
