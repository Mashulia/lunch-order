import { Column, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@Table({ tableName: 'email' })
export class Email extends Model<Email> {
  @ApiProperty({
    type: 'string',
    description: 'Тема письма',
  })
  @IsNotEmpty()
  @IsString()
  @Column
  subject: string;

  @ApiProperty({
    type: 'string',
    description: 'Содержание письма',
  })
  @IsNotEmpty()
  @IsString()
  @Column
  content: string;

  @ApiProperty({
    type: 'boolean',
    description: 'Статус отправки',
  })
  @IsNotEmpty()
  @IsBoolean()
  @Column
  isSent: boolean;
}
