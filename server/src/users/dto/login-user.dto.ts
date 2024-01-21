import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'example@mail.ru',
    description: 'Почтовый адрес',
  })
  @IsString({ message: 'Должно быть строкой' })
  email: string;

  @ApiProperty({
    example: '1234',
    description: 'Пароль',
  })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Не меньше 4 и не больше 16 символов' })
  password: string;
}
