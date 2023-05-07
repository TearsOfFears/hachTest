import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { University } from '../entities/university.entity';
import { FindOptions } from 'sequelize';
import { User } from '../../auth/entities/user.entity';
import { IFind, IFindAllOut } from '../interfaces/university.interfaces';
import { FindDto } from '../dto/university.dto';

@Injectable()
export class UniversityRepository {
  constructor(
    @InjectModel(University)
    private readonly universityModel: typeof University,
  ) {}

  async create(dtoIn) {
    return await this.universityModel.create(dtoIn);
  }
  async findAll(dtoIn: FindDto): Promise<IFindAllOut> {
    const offset: number = dtoIn.pageSize * dtoIn.pageIndex;
    const limit: number = dtoIn.pageSize;

    const options: FindOptions = {
      limit,
      offset,
      order: [[dtoIn.sortBy, dtoIn.order]],
    };

    const items: University[] = await this.universityModel.findAll(options);
    return {
      items,
      pageInfo: {
        pageTotal: items.length,
        pageSize: dtoIn.pageSize,
        pageIndex: dtoIn.pageIndex,
      },
    };
  }
}
