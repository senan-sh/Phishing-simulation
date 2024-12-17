import { Module } from '@nestjs/common';
import { PhishingService } from './phishing.service';
import { PhishingController } from './phishing.controller';

@Module({
  providers: [PhishingService],
  controllers: [PhishingController],
})
export class PhishingModule {}
