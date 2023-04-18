import { Injectable } from '@nestjs/common';
import { Question } from './entities/question.entity';
import { InjectModel } from '@nestjs/sequelize';
@Injectable()
export class QuestionService {
  constructor() {}
}
