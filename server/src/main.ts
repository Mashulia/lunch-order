import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Сервиc заказа корпоративных обедов')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addTag('Сервиc заказа корпоративных обедов')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.use(cors());
  await app.listen(PORT);
}
bootstrap();
