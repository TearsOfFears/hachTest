import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_ACCESS'),
    });
  }
  async validate({ email, isActivated }: Partial<User>) {
    if (!isActivated) {
      throw new HttpException(
        `You are not activate your account`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return { email };
  }
}
