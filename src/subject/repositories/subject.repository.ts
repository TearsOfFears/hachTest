import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Subject } from '../entities/subject.entity';
import { FindAllOut, FindDto } from '../../question/dto/question.dto';
import { FindOptions } from 'sequelize';
import { Answer } from '../../question/entities/answer.entity';
import { Question } from '../../question/entities/question.entity';
import { University } from '../../university/entities/university.entity';

@Injectable()
export class SubjectRepository {
  constructor(
    @InjectModel(Subject) private readonly subjectModel: typeof Subject,
  ) {}

  async create(dtoIn) {
    return await this.subjectModel.create(dtoIn);
  }
  async findAll(dtoIn: FindDto) {
    // const offset: number = dtoIn.pageInfo.pageSize * dtoIn.pageInfo.pageIndex;
    // const limit: number = dtoIn.pageInfo.pageSize;

    const options: FindOptions = {
      // limit,
      // offset,
      // order: [[dtoIn.sortBy, dtoIn.order]],
      include: [
        {
          model: University,
        },
      ],
    };

    // if (dtoIn.subjectId) {
    //   options.where = { subjectId: dtoIn.subjectId };
    // }

    // const items: Subject[] = await this.subjectModel.findAll(options);
    // return {
    //   items,
    //   pageInfo: {
    //     pageTotal: items.length,
    //     pageSize: dtoIn.pageInfo.pageSize,
    //     pageIndex: dtoIn.pageInfo.pageIndex,
    //   },
    // };
    return await this.subjectModel.findAll(options);
  }
}
