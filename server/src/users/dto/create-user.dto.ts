import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'example@mail.ru',
    description: 'Почтовый адрес',
  })
  email: string;

  @ApiProperty({
    example: '+79514357821',
    description: 'Телефон',
  })
  phone: number;

  @ApiProperty({
    example: 'Мария',
    description: 'Имя',
  })
  firstName: string;

  @ApiProperty({
    example: 'Руднева',
    description: 'Фамилия',
  })
  lastName: string;

  @ApiProperty({
    example: 'Отчество',
    description: 'Сергеевна',
  })
  middleName: string;
}
