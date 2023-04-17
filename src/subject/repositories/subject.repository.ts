import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Subject } from '../entities/subject.entity';

@Injectable()
export class SubjectRepository {
  constructor(
    @InjectModel(Subject) private readonly answerModel: typeof Subject,
  ) {}

  async create(dtoIn) {
    return await this.answerModel.create(dtoIn);
  }
}
