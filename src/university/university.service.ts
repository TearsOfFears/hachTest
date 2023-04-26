import { Injectable } from '@nestjs/common';
import { UniversityRepository } from './repositories/university.repository';
import { CreateDto } from './dto/university.dto';
import { University } from './entities/university.entity';

@Injectable()
export class UniversityService {
  constructor(private readonly universityRepository: UniversityRepository) {}

  async create(dtoIn: CreateDto): Promise<University> {
    return await this.universityRepository.create(dtoIn);
  }
}
