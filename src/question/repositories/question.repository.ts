import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Question } from '../entities/question.entity';
import { Answer } from '../entities/answer.entity';
import { Subject } from '../../subject/entities/subject.entity';
@Injectable()
export class QuestionRepository {
  constructor(
    @InjectModel(Question) private readonly questionModel: typeof Question,
  ) {}
  async create(dtoIn): Promise<Question> {
    return await this.questionModel.create(dtoIn);
  }
  async findAll(): Promise<Question[]> {
    return await this.questionModel.findAll({
      include: [
        {
          model: Answer,
        },
        {
          model: Subject,
        },
      ],
    });
  }
  async get(): Promise<Question> {
    return await this.questionModel.findOne({
      include: [
        {
          model: Answer,
        },
      ],
    });
  }
}

// export const ProductSchema = SchemaFactory.createForClass(Product);
