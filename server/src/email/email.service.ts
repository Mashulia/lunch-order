import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly userService: UsersService) {
    this.transporter = nodemailer.createTransport({
      service: 'mail',
      auth: {
        user: 'mrudneva@idscan.net',
        pass: 'your_password',
      },
    });
  }

  async sendMenuEmail(
    recipient: string,
    userName: string,
    menuLink: string,
  ): Promise<void> {
    const html = await this.renderTemplate('emailTemplate.hbs', {
      userName,
      menuLink,
    });

    const mailOptions = {
      from: 'your_email@gmail.com',
      to: recipient,
      subject: 'Menu for Week 10',
      html: html,
    };

    await this.transporter.sendMail(mailOptions);
  }

  private async renderTemplate(
    templatePath: string,
    context: any,
  ): Promise<string> {
    const template = fs.readFileSync(templatePath, 'utf8');
    const compiledTemplate = handlebars.compile(template);
    return compiledTemplate(context);
  }

  async sendToAllUsers(subject: string, content: string): Promise<void> {
    const users = await this.userService.getAllUsers();
    const recipients = users.map((user) => user.email);
    await this.sendEmail(subject, content, recipients);
  }
  async sendToRecipients(
    subject: string,
    content: string,
    recipients: string[],
  ): Promise<void> {
    await this.sendEmail(subject, content, recipients);
  }

  private async sendEmail(
    subject: string,
    content: string,
    recipients: string[],
  ): Promise<void> {
    // Здесь должна быть логика отправки электронных писем, например, через пакет nodemailer
  }
}
