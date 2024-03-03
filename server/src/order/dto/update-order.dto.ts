// create-order.dto.ts
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiProperty({
    type: 'string',
    description: 'Категория',
    example: 'Первые блюда',
  })
  @IsString()
  category: string;

  @ApiProperty({
    type: 'string',
    description: 'Дата заказа',
    example: '12/24/2023',
  })
  @IsString()
  orderDate: string;

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
    description: 'Количество порций',
    example: 1,
  })
  @IsNumber()
  qty: number;

  @ApiProperty({
    type: 'boolean',
    description: 'Размер порции',
    example: true,
  })
  @IsNumber()
  isSmall: boolean;

  @ApiProperty({
    type: 'integer',
    description: 'Количество маленьких порций',
    example: 1,
  })
  @IsNumber()
  qtySmall: number;

  @ApiProperty({
    type: 'string',
    description: 'Название блюда',
    example: 'Картофельное пюре',
  })
  @IsString()
  title: string;

  @ApiProperty({
    type: 'string',
    description: 'Цена за маленькую порцию',
    example: '100',
  })
  @IsString()
  @IsOptional()
  priceSmallPortion?: string;

  @ApiProperty({
    type: 'string',
    description: 'Цена за большую порцию',
    example: '138',
  })
  @IsString()
  @IsOptional()
  priceBigPortion?: string;
}
