import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Table,
  Model,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { EmployeeOrder } from 'src/orders/models/order.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';

interface UserCreationAttrs {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  static remove(user: User) {
    throw new Error('Method not implemented.');
  }
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'example@mail.ru',
    description: 'Почтовый адрес',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @ApiProperty({
    example:
      'file:///Users/mariarudneva/Desktop/Снимок%20экрана%202024-01-06%20в%2021.31.09.png',
    description: 'Фото профиля',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  avatarPhotoUrl: string;

  @ApiProperty({
    example: '1234',
    description: 'Пароль',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({
    example: '+7951435782',
    description: 'Телефон',
  })
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @ApiProperty({
    example: 'Руднева',
    description: 'Фамилия',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @ApiProperty({
    example: 'Мария',
    description: 'Имя',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @ApiProperty({
    example: 'Сергеевна',
    description: 'Отчество',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  middleName: string;

  @ApiProperty({
    example: 'false',
    description: 'Показывать только вегетерианские блюда',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isShowOnlyVegetarian: boolean;

  @ApiProperty({
    example: 'true',
    description: 'Получать рассылки',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isReceiveEmails: boolean;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasMany(() => EmployeeOrder)
  orders: EmployeeOrder[];
}
