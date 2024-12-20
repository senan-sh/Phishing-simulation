import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';

export interface RequestWithUser extends Request {
  user?: any;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  use(req: RequestWithUser, res: Response, next: NextFunction) {
    const token = req.cookies['accessToken'];

    if (!token) {
      throw new UnauthorizedException('Access denied');
    }

    try {
      const secret =
        this.configService.get<string>('JWT_SECRET') || 'your_jwt_secret_key';
      const decoded = jwt.verify(token, secret) as jwt.JwtPayload;

      req.user = {
        userId: decoded.userId,
        username: decoded.username,
      };

      next();
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
