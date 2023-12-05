import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Table,
  Model,
  BelongsToMany,
} from 'sequelize-typescript';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';

interface UserCreationAttrs {
  email: string;
  phone: number;
  password: string;
  firstName: string;
  lastName: string;
  middleName: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
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
    unique: true,
    allowNull: false,
  })
  email: string;

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
    example: '+79514357821',
    description: 'Телефон',
  })
  @Column({
    type: DataType.DECIMAL,
    unique: true,
    allowNull: false,
  })
  phone: string;

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
    example: 'Руднева',
    description: 'Фамилия',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @ApiProperty({
    example: 'Отчество',
    description: 'Сергеевна',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  middleName: string;

  @ApiProperty({
    example: 'false',
    description: 'Вегетерианец или нет',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isVegeterian: boolean;

  @ApiProperty({
    example: 'true',
    description: 'Получать ли рассылки',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isMailing: boolean;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
