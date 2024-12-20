import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { RequestWithUser } from 'src/auth/auth.middleware';

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('registration')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    schema: {
      example: {
        id: 1,
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@example.com',
        createdAt: '2024-12-20T12:34:56.789Z',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Validation failed or user already exists.',
    schema: {
      example: {
        statusCode: 400,
        message: [
          'Email must be a valid email address',
          'Passwords do not match',
        ],
        error: 'Bad Request',
      },
    },
  })
  @Post('registration')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async getUserDetails(@Req() req: RequestWithUser) {
    return this.usersService.findById(req.user.userId);
  }
}
