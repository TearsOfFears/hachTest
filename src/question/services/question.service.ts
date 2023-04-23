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
    let variantsParsed = '';
    dtoIn.variants.forEach(
      (el: string, inx: number) => (variantsParsed += `${inx + 1}. ${el}\n`),
    );
    const data = await this.openAIService.createCompletion(
      dtoIn.question + variantsParsed,
    );
    //data.choices[0].text
    const answer = await this.answerRepository.create(data.choices[0].text);
    dtoIn.answerId = answer.answerId;
    const question = await this.questionRepository.create(dtoIn);
    return { question, answer };
  }
}
