import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('emails')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send-to-all')
  async sendToAllUsers(
    @Body('subject') subject: string,
    @Body('content') content: string,
  ) {
    await this.emailService.sendToAllUsers(subject, content);
    return { message: 'Email sent successfully to all users' };
  }

  @Post('send-to-recipients')
  async sendToRecipients(
    @Body('subject') subject: string,
    @Body('content') content: string,
    @Body('recipients') recipients: string[],
  ) {
    await this.emailService.sendToRecipients(subject, content, recipients);
    return { message: 'Email sent successfully to recipients' };
  }
}
