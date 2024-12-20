import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AttemptsService } from './attempts.service';

@Controller('phishing-attempts')
export class AttemptsController {
  constructor(private attemptsService: AttemptsService) {}

  @Get()
  async listAttempts() {
    return this.attemptsService.findAll();
  }

  @Post()
  async createAttempt(@Body() body: { email: string }) {
    return this.attemptsService.createAndSend(body.email);
  }

  @Get(':id')
  async updateAttemptStatus(
    @Param('id') id: string,
    @Body() body: { status: string },
  ) {
    return this.attemptsService.updateStatus(id, body.status);
  }
}
