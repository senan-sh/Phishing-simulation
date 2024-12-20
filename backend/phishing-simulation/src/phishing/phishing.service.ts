import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PhishingAttempt,
  PhishingAttemptDocument,
} from '@shared/schemas/phishing-attempts.schema';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class SimulationService {
  private transporter: nodemailer.Transporter<
    SMTPTransport.SentMessageInfo,
    SMTPTransport.Options
  >;

  constructor(
    @InjectModel(PhishingAttempt.name)
    private phishingAttemptModel: Model<PhishingAttemptDocument>,
  ) {
    this.configureMailTransporter();
  }

  private configureMailTransporter() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_USER_PASSWORD,
      },
    });
  }

  private generateLink(attemptId: string): string {
    return `${process.env.API_ATTEMPT_MANAGEMENT}/phishing/clicked?attemptId=${attemptId}`;
  }

  private generateMailOptions(email: string, link: string): Mail.Options {
    return {
      from: '"Phishing Simulation" <your_email@example.com>',
      to: email,
      subject: 'Phishing Test',
      html: `
          <p>This is a phishing simulation email.</p>
          <p>Click <a href="${link}" target="_blank">here</a> to test your awareness.</p>
        `,
    };
  }

  async sendPhishingEmail(
    email: string,
    attemptId: string,
  ): Promise<{ message: string }> {
    try {
      const link = this.generateLink(attemptId);
      const mailOptions = this.generateMailOptions(email, link);
      await this.transporter.sendMail(mailOptions);
      await this.phishingAttemptModel.findByIdAndUpdate(attemptId, {
        status: 'SENT',
      });
      return { message: 'Phishing email sent successfully' };
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'Failed to send phishing email',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async markClicked(attemptId: string): Promise<{ message: string }> {
    try {
      await this.phishingAttemptModel.findByIdAndUpdate(attemptId, {
        status: 'CLICKED',
      });

      return { message: 'Phishing attempt marked as clicked' };
    } catch {
      throw new HttpException(
        'Failed to update phishing attempt',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
