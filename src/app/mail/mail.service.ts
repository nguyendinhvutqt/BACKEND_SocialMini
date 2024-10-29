// mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('EMAIL_HOST'),
      port: +this.configService.get<string>('EMAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });
  }

  async sendVerificationEmail(email: string, token: string) {
    const url = `${process.env.BACKEND_URL}/auth/verify-email?token=${token}`;
    await this.transporter.sendMail({
      from: '"Your App" <your-email@example.com>',
      to: email,
      subject: 'Verify your email',
      text: `Click here to verify your email: ${url}`,
      html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
      <h2 style="color: #333;">Verify Your Email Address</h2>
      <p>Hi there,</p>
      <p>Thank you for registering with us! Please verify your email address by clicking the button below:</p>
      <a href="${url}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
      <p>If you did not create an account, no further action is required.</p>
      <p>Best regards,<br>Your App Team</p>
    </div>
  `,
    });
  }
}
