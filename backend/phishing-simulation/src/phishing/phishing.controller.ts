import { Controller, Post, Body } from '@nestjs/common';
import { PhishingService } from './phishing.service';

@Controller('phishing')
export class PhishingController {
  constructor(private readonly phishingService: PhishingService) {}

  @Post('send')
  async send(@Body() email: string): Promise<{ message: string }> {
    if (!email) {
      return { message: 'Email is required.' };
    }

    await this.phishingService.sendEmail(email);
    return { message: `Phishing email sent to ${email}` };
  }
}
