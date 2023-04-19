import { Body, Controller, Post, Get } from '@nestjs/common';
import { QuestionService } from './services/question.service';
import { CreateDto, FindDto } from './dto/question.dto';
import { QuestionRepository } from './repositories/question.repository';
import { TelegramService } from '../telegram/telegram.service';

@Controller('question')
export class QuestionController {
  constructor(
    public readonly questionService: QuestionService,
    public readonly questionRepository: QuestionRepository,
    private readonly telegramService: TelegramService,
  ) {}

  @Post('create')
  async create(@Body() dtoIn: Omit<CreateDto, 'answerId'>) {
    const dtoOut = await this.questionService.createAndGetAnswer(dtoIn);
    await this.telegramService.sendMessage('testttt');
    return dtoOut;
  }
  @Get('find')
  async find(@Body() dtoIn: FindDto) {
    const a = await this.questionRepository.findAll(dtoIn);
    return a;
  }
}
