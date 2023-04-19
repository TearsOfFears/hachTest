import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { getSequelizeConfig } from './configs/sequelize.config';
import { QuestionModule } from './question/question.module';
import { SubjectModule } from './subject/subject.module';
import { TelegramModule } from './telegram/telegram.module';
import { getTelegramConfig } from './configs/telegram.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TelegramModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigModule],
      useFactory: getTelegramConfig,
    }),
    SequelizeModule.forRootAsync(getSequelizeConfig()),
    QuestionModule,
    SubjectModule,
  ],
})
export class AppModule {}
