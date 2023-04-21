import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTelegramConfig } from '../configs/telegram.config';
import { TelegramService } from './telegram.service';
import { AuthModule } from '../auth/auth.module';
import { UserRepository } from '../auth/repositories/user.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../auth/entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getTelegramConfig,
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  providers: [TelegramService, JwtService, AuthService],
})
export class TelegramModule {}
