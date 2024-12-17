import { Module } from '@nestjs/common';
import { PhishingModule } from './phishing/phishing.module';

@Module({
  imports: [PhishingModule],
})
export class AppModule {}
