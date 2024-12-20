import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class CookieService {
  isProduction = process.env.NODE_ENV === 'PRODUCTION';
  setAuthCookie(res: Response, token: string): void {
    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 60 * 60 * 1000,
      path: '/',
    });
  }

  clearAuthCookie(res: Response): void {
    res.cookie('accessToken', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: new Date(0),
      path: '/',
    });
  }
}
