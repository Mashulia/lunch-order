import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSupplierDto {
  @ApiProperty({
    example: 'ООО "БизнесТайм"',
    description: 'Название поставщика',
  })
  @IsString({ message: 'Должно быть строкой' })
  name: string;
}
