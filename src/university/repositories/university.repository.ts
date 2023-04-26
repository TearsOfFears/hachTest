import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { University } from '../entities/university.entity';

@Injectable()
export class UniversityRepository {
  constructor(
    @InjectModel(University)
    private readonly universityModel: typeof University,
  ) {}

  async create(dtoIn) {
    return await this.universityModel.create(dtoIn);
  }
}
