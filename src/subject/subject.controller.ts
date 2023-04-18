import { Body, Controller, Post } from '@nestjs/common';
import { SubjectRepository } from './repositories/subject.repository';

@Controller('subject')
export class SubjectController {
  constructor(public readonly subjectRepository: SubjectRepository) {}

  @Post('create')
  async create(@Body() dtoIn) {
    const a = await this.subjectRepository.create(dtoIn);
    return a;
  }
}
