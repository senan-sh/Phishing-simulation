import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhishingSimulationController } from './phishing.controller';
import { SimulationService } from './phishing.service';
import {
  PhishingAttempt,
  PhishingAttemptSchema,
} from '@shared/schemas/phishing-attempts.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PhishingAttempt.name, schema: PhishingAttemptSchema },
    ]),
  ],
  controllers: [PhishingSimulationController],
  providers: [SimulationService],
})
export class PhishingSimulationModule {}
