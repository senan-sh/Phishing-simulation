import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CookieService } from './cookie.service';
import { ConfigService } from '@nestjs/config';

const CustomJwtService = JwtModule.registerAsync({
  useFactory: (configService: ConfigService) => ({
    secret: configService.get<string>('JWT_SECRET'),
    signOptions: { expiresIn: '1h' },
  }),
  inject: [ConfigService],
});
@Module({
  imports: [PassportModule, UsersModule, CustomJwtService],
  providers: [AuthService, CookieService],
  controllers: [AuthController],
  exports: [CustomJwtService],
})
export class AuthModule {}
