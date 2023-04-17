import { Body, Controller, Post, Get } from '@nestjs/common';
import { QuestionRepository } from './repositories/question.repository';

@Controller('question')
export class QuestionController {
  constructor(public readonly questionRepository: QuestionRepository) {}

  @Post('create')
  async create(@Body() dtoIn) {
    const a = await this.questionRepository.create(dtoIn);
    return a;
  }
  @Get('find')
  async find(@Body() dtoIn) {
    const a = await this.questionRepository.find();
    return a;
  }
}
