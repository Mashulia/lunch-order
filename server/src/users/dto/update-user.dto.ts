import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UpdateUserDto {
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

  @ApiProperty({
    example:
      'file:///Users/mariarudneva/Desktop/Снимок%20экрана%202024-01-06%20в%2021.31.09.png',
    description: 'Фото профиля',
  })
  avatarPhotoUrl: string;

  @ApiProperty({
    example: '+79514357821',
    description: 'Телефон',
  })
  phone: string;

  @ApiProperty({
    example: 'Мария',
    description: 'Имя',
  })
  @IsString({ message: 'Должно быть строкой' })
  firstName: string;

  @ApiProperty({
    example: 'Руднева',
    description: 'Фамилия',
  })
  @IsString({ message: 'Должно быть строкой' })
  lastName: string;

  @ApiProperty({
    example: 'Сергеевна',
    description: 'Отчество',
  })
  @IsString({ message: 'Должно быть строкой' })
  middleName: string;
}
