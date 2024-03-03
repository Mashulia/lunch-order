import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { UsersModule } from 'src/users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Email } from './email.model';
import { User } from 'src/users/users.model';

@Module({
  providers: [EmailService],
  controllers: [EmailController],
  imports: [SequelizeModule.forFeature([Email, User]), UsersModule],
})
export class EmailModule {}
