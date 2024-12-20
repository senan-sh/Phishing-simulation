import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('registration')
  // TODO: implement better types with validators
  async register(@Body() body: { email: string }) {
    return this.usersService.create(body);
  }

  @Get()
  async getUserDetails() {
    return this.usersService.findById(body);
  }
}
