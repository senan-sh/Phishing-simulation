// src/auth/auth.middleware.ts

import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies['Authorization'];

    if (!token) {
      return next();
    }

    try {
      const secret =
        this.configService.get<string>('JWT_SECRET') || 'your_jwt_secret_key';
      const decoded = jwt.verify(token, secret) as jwt.JwtPayload;

      req.local = {
        userId: decoded.sub,
        username: decoded.username,
      };

      next();
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
