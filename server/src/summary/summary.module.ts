import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { OrderModule } from 'src/order/order.module';
import { SummaryService } from './summary.service';
import { SummaryController } from './summary.controller';

@Module({
  providers: [SummaryService],
  controllers: [SummaryController],
  imports: [
    OrderModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
})
export class SummaryModule {}
