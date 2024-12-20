import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const result = await bcrypt.compare(pass, user.password);
    if (!result) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.email, name: user.name, userId: user._id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
