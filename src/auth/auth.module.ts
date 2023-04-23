import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../configs/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { AccessStrategy } from './strategies/access.strategy';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { RefreshStrategy } from './strategies/refresh.strategy';

@Module({
  imports: [
    ConfigModule,
    SequelizeModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    PassportModule,
  ],
  exports: [UserRepository, AccessStrategy, RefreshStrategy, AuthService],
  controllers: [AuthController],
  providers: [UserRepository, AccessStrategy, RefreshStrategy, AuthService],
})
export class AuthModule {}
