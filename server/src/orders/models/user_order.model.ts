// user-order.model.ts
import {
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { EmployeeOrder } from './order.model';

@Table({ tableName: 'user_orders' })
export class UserOrder extends Model<UserOrder> {
  @ForeignKey(() => User)
  @Column
  id: number;

  @ForeignKey(() => EmployeeOrder)
  @Column
  orderId: number;

  @BelongsToMany(() => User, () => UserOrder)
  users: User[];

  @BelongsToMany(() => EmployeeOrder, () => UserOrder)
  orders: EmployeeOrder[];
}
