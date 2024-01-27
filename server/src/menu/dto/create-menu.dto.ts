import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { DishGroup, DayOfWeek } from '../enums';

export class CreateMenuDto {
  @IsNumber()
  supplierId: number;

  @IsArray()
  @IsNotEmpty()
  menuItems: CreateMenuItemDto[];
}

export class CreateMenuItemDto {
  @IsString()
  @IsNotEmpty()
  date: string;

  @IsEnum(DayOfWeek)
  dayOfWeek: DayOfWeek;

  @IsArray()
  @IsNotEmpty()
  dishes: CreateDishDto[];
}

export class CreateDishDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(DishGroup)
  category: DishGroup;

  @IsString()
  priceSmallPortion: string;

  @IsString()
  priceLargePortion: string;

  @IsNumber()
  menuItemId: number;

  @IsArray()
  ingredients: CreateIngredientDto[];
}

export class CreateIngredientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  comments?: string;

  @IsString()
  composition: string;
}
