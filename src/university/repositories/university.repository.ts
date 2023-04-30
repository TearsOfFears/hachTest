import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { University } from '../entities/university.entity';
import { FindOptions } from 'sequelize';
import { User } from '../../auth/entities/user.entity';
import { IFind, IFindAllOut } from '../interfaces/university.interfaces';

@Injectable()
export class UniversityRepository {
  constructor(
    @InjectModel(University)
    private readonly universityModel: typeof University,
  ) {}

  async create(dtoIn) {
    return await this.universityModel.create(dtoIn);
  }
  //Promise<IFindAllOut>
  async findAll(dtoIn) {
    // const offset: number = dtoIn.pageInfo.pageSize * dtoIn.pageInfo.pageIndex;
    // const limit: number = dtoIn.pageInfo.pageSize;

    const options: FindOptions = {
      // limit,
      // offset,
      order: [[dtoIn.sortBy, dtoIn.order]],
    };

    // if (dtoIn.subjectId) {
    //   options.where = { subjectId: dtoIn.subjectId };
    // }

    const items: University[] = await this.universityModel.findAll(options);
    return {
      items,
      pageInfo: {
        pageTotal: items.length,
        // pageSize: dtoIn.pageInfo.pageSize,
        // pageIndex: dtoIn.pageInfo.pageIndex,
      },
    };
  }
}
