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
import { SubjectRepository } from '../subject/repositories/subject.repository';
import { Subject } from '../subject/entities/subject.entity';
import { TelegramModule } from '../telegram/telegram.module';
import { TelegramService } from '../telegram/telegram.service';
import { UserRepository } from '../auth/repositories/user.repository';
import { AuthModule } from '../auth/auth.module';
import { User } from '../auth/entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

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
  exports: [AnswerRepository, QuestionRepository],
})
export class QuestionModule {}
