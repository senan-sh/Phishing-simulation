import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class PhishingService {
  private transporter: nodemailer.Transporter;

  onModuleInit() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.PHISHING_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendEmail(recipientEmail: string): Promise<void> {
    const phishingLink = `http://localhost:3001/phishing/clicked?email=${recipientEmail}`;

    const mailOptions = {
      from: process.env.PHISHING_EMAIL,
      to: recipientEmail,
      subject: 'Phish Simulation Test',
      text: `This is a phishing simulation email. Click the link to proceed: ${phishingLink}`,
      html: `<p>This is a <strong>phishing simulation</strong> email.</p>
             <p>Click <a href="${phishingLink}">here</a> to proceed.</p>`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
