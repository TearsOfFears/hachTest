import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './services/question.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from './entities/question.entity';
import { Answer } from './entities/answer.entity';
import { AnswerRepository } from './repositories/answer.repository';
import { QuestionRepository } from './repositories/question.repository';
import { OpenAIModule } from '@platohq/nestjs-openai';
import { OpenAIService } from './services/openAI.service';
import { ConfigService } from '@nestjs/config';
import { getOpenAiConfig } from '../configs/openAI.config';
import { TelegramModule } from '../telegram/telegram.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Question, Answer]),
    OpenAIModule.registerAsync({
      inject: [ConfigService],
      useFactory: getOpenAiConfig,
    }),
    AuthModule,
    SequelizeModule,
    TelegramModule,
  ],
  controllers: [QuestionController],
  providers: [
    QuestionService,
    OpenAIService,
    AnswerRepository,
    QuestionRepository,
  ],
  exports: [
    AnswerRepository,
    QuestionRepository,
    QuestionService,
    OpenAIService,
  ],
})
export class QuestionModule {}
