import { Controller, Get } from '@nestjs/common';

const mockAttempts = [
  {
    date: new Date().toISOString(),
    round: Math.random() * 10000,
    uuid: crypto.randomUUID(),
  },
];
@Controller('attempts')
export class AttemptsController {
  @Get()
  async listAttempts() {
    return mockAttempts;
  }
}
