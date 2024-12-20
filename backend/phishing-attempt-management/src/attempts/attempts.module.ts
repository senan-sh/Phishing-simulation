import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PhishingAttempt,
  PhishingAttemptSchema,
} from '@shared/schemas/phishing-attempts.schema';
import { AttemptsController } from './attempts.controller';
import { AttemptsService } from './attempts.service';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PhishingAttempt.name, schema: PhishingAttemptSchema },
    ]),
    HttpModule,
    AuthModule
  ],
  providers: [AttemptsService],
  controllers: [AttemptsController],
  exports: [AttemptsService],
})
export class AttemptsModule {}
