import { Controller, Post, Get, Query, Body } from '@nestjs/common';
import { SimulationService } from './phishing.service';

@Controller('phishing')
export class PhishingSimulationController {
  constructor(private simulationService: SimulationService) {}

  @Post('send')
  async sendEmail(@Body() body: { email: string; attemptId: string }) {
    return this.simulationService.sendPhishingEmail(body.email, body.attemptId);
  }

  @Get('clicked')
  async linkClicked(@Query('attemptId') attemptId: string) {
    return this.simulationService.markClicked(attemptId);
  }
}
