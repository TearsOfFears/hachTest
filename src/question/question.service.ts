import { Injectable } from '@nestjs/common';
import { Question } from './entities/question.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Answer } from './entities/answer.entity';
@Injectable()
export class QuestionService {
  constructor() {}
}
