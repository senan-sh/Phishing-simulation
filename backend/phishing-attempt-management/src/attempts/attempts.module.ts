import { Module } from '@nestjs/common';
import { AttemptsService } from './attempts.service';
import { AttemptsController } from './attempts.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PhishingAttempt,
  PhishingAttemptSchema,
} from '@shared/schemas/phishing-attempts.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: PhishingAttempt.name, schema: PhishingAttemptSchema },
    ]),
  ],
  providers: [AttemptsService],
  controllers: [AttemptsController],
})
export class AttemptsModule {}
