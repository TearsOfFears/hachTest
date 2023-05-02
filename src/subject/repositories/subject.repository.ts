import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Subject } from '../entities/subject.entity';
import { FindOptions } from 'sequelize';
import { University } from '../../university/entities/university.entity';
import { IFind, IFindAllOut } from '../interfaces/subject.interaface';
import { CreateSubjectDto } from '../dto/subject.dto';

@Injectable()
export class SubjectRepository {
  constructor(
    @InjectModel(Subject) private readonly subjectModel: typeof Subject,
  ) {}

  async create(dtoIn): Promise<Subject> {
    return this.subjectModel.create(dtoIn);
  }
  async getByTitle(title: string): Promise<Subject | null> {
    const subject = await this.subjectModel.findOne({ where: { title } });
    return subject?.dataValues;
  }
  async getBySubjectId(subjectId: string): Promise<Subject> {
    return this.subjectModel.findByPk(subjectId);
  }
  async findAll(dtoIn: IFind): Promise<IFindAllOut> {
    const offset: number = dtoIn.pageInfo.pageSize * dtoIn.pageInfo.pageIndex;
    const limit: number = dtoIn.pageInfo.pageSize;

    const options: FindOptions = {
      limit,
      offset,
      order: [[dtoIn.sortBy, dtoIn.order]],
      include: [
        {
          model: University,
        },
      ],
    };

    // if (dtoIn.subjectId) {
    //   options.where = { subjectId: dtoIn.subjectId };
    // }

    const items: Subject[] = await this.subjectModel.findAll(options);
    return {
      items,
      pageInfo: {
        pageTotal: items.length,
        pageSize: dtoIn.pageInfo.pageSize,
        pageIndex: dtoIn.pageInfo.pageIndex,
      },
    };
  }
}
