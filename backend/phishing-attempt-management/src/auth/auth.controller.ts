// src/auth/auth.controller.ts
import {
  Body,
  Controller,
  Post,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CookieService } from './cookie.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      example: { message: 'Login successful' },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
    schema: {
      example: { message: 'Invalid credentials' },
    },
  })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { accessToken } = await this.authService.signIn(
        loginDto.username,
        loginDto.password,
      );
      this.cookieService.setAuthCookie(res, accessToken);
      return { message: 'Login successful' };
    } catch {
      res.status(HttpStatus.UNAUTHORIZED);
      return { message: 'Invalid credentials' };
    }
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User logout' })
  @ApiResponse({
    status: 200,
    description: 'Logout successful',
    schema: {
      example: { message: 'Logout successful' },
    },
  })
  async logout(@Res({ passthrough: true }) res: Response) {
    this.cookieService.clearAuthCookie(res);
    return { message: 'Logout successful' };
  }
}
