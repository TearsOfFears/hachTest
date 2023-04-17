import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from './entities/question.entity';
import { Answer } from './entities/answer.entity';
import { AnswerRepository } from './repositories/answer.repository';
import { QuestionRepository } from './repositories/question.repository';

@Module({
  imports: [SequelizeModule.forFeature([Question, Answer])],
  controllers: [QuestionController],
  providers: [QuestionService, AnswerRepository, QuestionRepository],
  exports: [AnswerRepository, QuestionRepository],
})
export class QuestionModule {}
