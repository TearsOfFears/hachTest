import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Question } from '../entities/question.entity';
import { Answer } from '../entities/answer.entity';
import { Subject } from '../../subject/entities/subject.entity';
import { FindDto } from '../dto/question.dto';
import { CreateDto } from '../dto/answer.dto';
import { FindOptions } from 'sequelize';
import { IFindAllOut } from '../interfaces/question.interface';
@Injectable()
export class QuestionRepository {
  constructor(
    @InjectModel(Question) private readonly questionModel: typeof Question,
  ) {}
  async create(dtoIn: CreateDto): Promise<Question> {
    return await this.questionModel.create(dtoIn);
  }
  async findAll(dtoIn: FindDto): Promise<IFindAllOut> {
    const offset: number = dtoIn.pageSize * dtoIn.pageIndex;
    const limit: number = dtoIn.pageSize;

    const options: FindOptions = {
      limit,
      offset,
      order: [[dtoIn.sortBy, dtoIn.order]],
      include: [
        {
          model: Answer,
        },
        {
          model: Subject,
        },
      ],
    };

    if (dtoIn.subjectId) {
      options.where = { subjectId: dtoIn.subjectId };
    }

    const items: Question[] = await this.questionModel.findAll(options);
    return {
      items,
      pageInfo: {
        pageTotal: items.length,
        pageSize: dtoIn.pageSize,
        pageIndex: dtoIn.pageIndex,
      },
    };
  }
  async getByQuestion(question: string): Promise<Question> {
    return this.questionModel.findOne({
      where: { question },
      include: [
        {
          model: Answer,
        },
      ],
    });
  }
}
