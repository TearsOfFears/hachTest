import { Injectable } from '@nestjs/common';
import { QuestionRepository } from '../repositories/question.repository';
import { AnswerRepository } from '../repositories/answer.repository';
import { OpenAIService } from './openAI.service';
import { CreateDto } from '../dto/question.dto';

@Injectable()
export class QuestionService {
  constructor(
    public readonly questionRepository: QuestionRepository,
    public readonly answerRepository: AnswerRepository,
    public readonly openAIService: OpenAIService,
  ) {}

  async createAndGetAnswer(dtoIn: CreateDto) {
    // const data = await this.openAIService.createCompletion(
    //   dtoIn.question + dtoIn.variants,
    // );
    //data.choices[0].text
    const answer = await this.answerRepository.create('fff');
    dtoIn.answerId = answer.answerId;
    const question = await this.questionRepository.create(dtoIn);
    return { question, answer };
  }
}
