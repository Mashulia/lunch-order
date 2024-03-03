import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env', // Путь к вашему файлу .env
      isGlobal: true,
    }),
  ],
})
export class CustomConfigModule {}
