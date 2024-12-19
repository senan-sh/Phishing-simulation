import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import {
  PhishingAttempt,
  PhishingAttemptDocument,
} from '@shared/schemas/phishing-attempts.schema';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AttemptsService {
  constructor(
    @InjectModel(PhishingAttempt.name)
    private httpService: HttpService,
    private jwtService: JwtService,
    private phishingAttemptModel: Model<PhishingAttemptDocument>,
  ) {}

  async findAll() {
    return this.phishingAttemptModel.find().exec();
  }

  private generateAccessToken() {
    const defaultUser = { username: 'admin', name: 'Admin' };
    return this.jwtService.sign(defaultUser);
  }

  async createAndSend(email: string) {
    try {
      const attempt = await this.phishingAttemptModel.create({
        email,
        status: 'PENDING',
        createdAt: new Date(),
      });

      // TODO: Implement with observable
      const { status } = await firstValueFrom(
        this.httpService.post(process.env.SEND_EMAIL_URI),
      );

      await this.phishingAttemptModel.findByIdAndUpdate(attempt._id, {
        status: 'SENT',
      });

      return { message: 'Phishing email sent successfully', attempt };
    } catch {
      throw new HttpException(
        'Failed to create and send phishing attempt',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateStatus(id: string, status: string) {
    const validStatuses = ['PENDING', 'SENT', 'CLICKED'];
    if (!validStatuses.includes(status)) {
      throw new HttpException('Invalid status', HttpStatus.BAD_REQUEST);
    }

    const updatedAttempt = await this.phishingAttemptModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!updatedAttempt) {
      throw new HttpException(
        'Phishing attempt not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return updatedAttempt;
  }
}
