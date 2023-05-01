import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTelegramConfig } from '../configs/telegram.config';
import { TelegramService } from './telegram.service';
import { AuthModule } from '../auth/auth.module';
import { UniversityModule } from '../university/university.module';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getTelegramConfig,
      inject: [ConfigService],
    }),
    AuthModule,
    UniversityModule,
  ],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class TelegramModule {}
