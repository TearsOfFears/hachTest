import {
  Body,
  Controller,
  Post,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SubjectRepository } from './repositories/subject.repository';
import { CreateSubjectDto } from './dto/subject.dto';

@Controller('subject')
export class SubjectController {
  constructor(public readonly subjectRepository: SubjectRepository) {}

  @Post('create')
  async create(@Body() dtoIn: CreateSubjectDto) {
    const subject = await this.subjectRepository.getByTitle(dtoIn.title);
    if (subject) {
      return subject;
    }
    return await this.subjectRepository.create(dtoIn);
  }
  @Get('find')
  async find(@Body() dtoIn) {
    return this.subjectRepository.findAll(dtoIn);
  }
}
