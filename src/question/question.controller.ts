import { Body, Controller, Post, Get } from '@nestjs/common';
import { QuestionRepository } from './repositories/question.repository';
import { OpenAIService } from './services/openAI.service';
import { AnswerRepository } from './repositories/answer.repository';

@Controller('question')
export class QuestionController {
  constructor(
    public readonly questionRepository: QuestionRepository,
    public readonly answerRepository: AnswerRepository,
    public readonly openAIService: OpenAIService,
  ) {}

  @Post('create')
  async create(@Body() dtoIn) {
    // const data = await this.openAIService.createCompletion(dtoIn.question);data.choices[0].text
    const answer = await this.answerRepository.create('another answer');
    console.log(answer.answerId);
    dtoIn.answerId = answer.answerId;
    const a = await this.questionRepository.create(dtoIn);

    return a;
  }
  @Get('find')
  async find(@Body() dtoIn) {
    const a = await this.questionRepository.findAll();
    return a;
  }
}
