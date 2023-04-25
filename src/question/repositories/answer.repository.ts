import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Answer } from '../entities/answer.entity';

@Injectable()
export class AnswerRepository {
  constructor(
    @InjectModel(Answer) private readonly answerModel: typeof Answer,
  ) {}

  async create(answerChatGpt: string): Promise<Answer> {
    return await this.answerModel.create({
      answerChatGpt,
    });
  }
}
