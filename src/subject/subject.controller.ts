import { Body, Controller, Post, Get } from '@nestjs/common';
import { SubjectRepository } from './repositories/subject.repository';

@Controller('subject')
export class SubjectController {
  constructor(public readonly subjectRepository: SubjectRepository) {}

  @Post('create')
  async create(@Body() dtoIn) {
    return await this.subjectRepository.create(dtoIn);
  }
  @Get('find')
  async find(@Body() dtoIn) {
    const a = await this.subjectRepository.findAll(dtoIn);
    return a;
  }
}
