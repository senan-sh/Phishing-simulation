import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PhishingAttempt,
  PhishingAttemptDocument,
} from './schemas/phishing-attempt.schema';

@Injectable()
export class SimulationService {
  private transporter;

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

  async sendPhishingEmail(
    email: string,
    attemptId: string,
  ): Promise<{ message: string }> {
    try {
      const link = `http://localhost:3000/phishing/clicked?attemptId=${attemptId}`;

      const mailOptions = {
        from: '"Phishing Simulation" <your_email@example.com>',
        to: email,
        subject: 'Phishing Test',
        html: `
          <p>This is a phishing simulation email.</p>
          <p>Click <a href="${link}" target="_blank">here</a> to test your awareness.</p>
        `,
      };

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
