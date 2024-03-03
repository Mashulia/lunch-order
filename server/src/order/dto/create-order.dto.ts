// create-order.dto.ts
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    type: 'string',
    description: 'Дата заказа',
    example: '2023-12-24',
  })
  @IsString()
  orderDate: string;

  @ApiProperty({
    type: 'integer',
    description: 'Количество больших порций',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  bigPortionQty?: number;

  @ApiProperty({
    type: 'integer',
    description: 'Количество маленьких порций',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  smallPortionQty?: number;

  @ApiProperty({
    type: 'integer',
    description: 'ID блюда',
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  dishId: number;

  @ApiProperty({
    type: 'integer',
    description: 'ID пользователя',
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  userId: number;
}
