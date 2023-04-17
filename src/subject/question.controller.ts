import { Body, Controller, Post } from '@nestjs/common';
import { SubjectRepository } from './repositories/subject.repository';

@Controller('subject')
export class QuestionController {
  constructor(public readonly subjectRepository: SubjectRepository) {}

  @Post('create')
  async create(@Body() dtoIn) {
    const a = await this.subjectRepository.create(dtoIn);
    console.log('aaaa', a);
    return a;
  }
}
