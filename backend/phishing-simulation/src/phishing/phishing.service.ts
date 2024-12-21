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
    // this.transporter = nodemailer.createTransport({
    //   host: process.env.EMAIL_HOST,
    //   port: parseInt(process.env.EMAIL_PORT),
    //   secure: false,
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_USER_PASSWORD,
    //   },
    // });
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: '',
        pass: '',
      },
    });
  }

  private generateLink(attemptId: string): string {
    return `${process.env.API_ATTEMPT_MANAGEMENT}/phishing-attempts/${attemptId}`;
  }

  private generateMailOptions(
    email: string,
    emailContent: string,
    link: string,
  ): Mail.Options {
    return {
      from: 'Sanan senan545@gmail.com',
      to: 'senan200125@gmail.com',
      subject: 'Phishing Test',
      text: emailContent,
      html: `
          <p>This is a phishing simulation email.</p>
          <p>Click <a href="${link}" target="_blank">here</a> to test your awareness.</p>
        `,
    };
  }

  async sendPhishingEmail(body: {
    email: string;
    emailContent: string;
    attemptId: string;
  }): Promise<{ message: string }> {
    try {
      const link = this.generateLink(body.attemptId);
      console.log({ link });
      const mailOptions = this.generateMailOptions(
        body.email,
        body.emailContent,
        link,
      );
      console.log({ mailOptions });
      await this.transporter.sendMail(mailOptions);
      await this.phishingAttemptModel.findByIdAndUpdate(body.attemptId, {
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
}
