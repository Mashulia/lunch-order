// create-order.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CreateOrderDishDto {
  @ApiProperty({ example: 1, description: 'Идентификатор блюда' })
  @IsNotEmpty()
  dishId: number;

  @ApiProperty({ example: 2, description: 'Количество порций' })
  @IsNotEmpty()
  portionCount: number;
}

export class CreateOrderDto {
  @ApiProperty({ example: 1, description: 'Идентификатор заказа' })
  @IsNotEmpty()
  id: number;

  @ApiProperty({ example: 1, description: 'Идентификатор юзера' })
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: '12/12/2023', description: 'Дата заказа' })
  @IsNotEmpty()
  @IsString()
  orderDate: string;

  @ApiProperty({
    example: [{ dishId: 1, portionCount: 2 }],
    description: 'Список блюд в заказе',
    type: [CreateOrderDishDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderDishDto)
  orderDishes: CreateOrderDishDto[];
}
