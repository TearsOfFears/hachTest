import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Answer } from '../entities/answer.entity';
import { Question } from '../entities/question.entity';

@Injectable()
export class AnswerRepository {
  constructor(
    @InjectModel(Answer) private readonly answerModel: typeof Answer,
  ) {}

  async create(answerChatGpt: string) {
    return await this.answerModel.create({
      answerChatGpt,
    });
  }
}
