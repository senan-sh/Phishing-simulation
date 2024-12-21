import { Body, Controller, Post } from '@nestjs/common';
import { SimulationService } from './phishing.service';

@Controller('phishing')
export class PhishingSimulationController {
  constructor(private simulationService: SimulationService) {}

  @Post('send')
  async sendEmail(
    @Body() body: { email: string; emailContent: string; attemptId: string },
  ) {
    return this.simulationService.sendPhishingEmail(body);
  }
}
