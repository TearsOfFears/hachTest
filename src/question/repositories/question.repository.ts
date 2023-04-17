import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Question } from '../entities/question.entity';
@Injectable()
export class QuestionRepository {
  constructor(
    @InjectModel(Question) private readonly questionModel: typeof Question,
  ) {}
  async create(dtoIn): Promise<Question> {
    return await this.questionModel.create(dtoIn);
  }
  async find(): Promise<Question[]> {
    return await this.questionModel.findAll({});
  }
}

// export const ProductSchema = SchemaFactory.createForClass(Product);
