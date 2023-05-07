import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { SubjectRepository } from './repositories/subject.repository';
import { CreateSubjectDto } from './dto/subject.dto';
import { FindDto } from '../subject/dto/subject.dto';

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
  async find(@Query() dtoIn: FindDto) {
    return this.subjectRepository.findAll(dtoIn);
  }
  @Get('getById/:subjectId')
  async getById(@Param('subjectId') subjectId) {
    return this.subjectRepository.getBySubjectId(subjectId);
  }
  @Get('getByTitle/:title')
  async getByTitle(@Param('title') title) {
    console.log('title', title);
    const subject = await this.subjectRepository.getByTitle(title);
    if (!subject) {
      throw new HttpException('Not exist', HttpStatus.BAD_REQUEST);
    }
    return subject;
  }
}
