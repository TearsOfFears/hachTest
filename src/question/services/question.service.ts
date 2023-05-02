import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { QuestionRepository } from '../repositories/question.repository';
import { AnswerRepository } from '../repositories/answer.repository';
import { OpenAIService } from './openAI.service';
import { CreateDto } from '../dto/question.dto';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
@Injectable()
export class QuestionService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheService: Cache,
    public readonly questionRepository: QuestionRepository,
    public readonly answerRepository: AnswerRepository,
    public readonly openAIService: OpenAIService,
  ) {}

  async createAndGetAnswer(dtoIn: CreateDto) {
    const isCached = await this.cacheService.get<string>(dtoIn.question);
    if (isCached) {
      return JSON.parse(isCached);
    }
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
    let question;
    try {
      question = await this.questionRepository.create(dtoIn);
    } catch (e) {
      if (e.name === 'SequelizeUniqueConstraintError') {
        question = await this.checkExistQuestion(dtoIn.question);
      }
    }
    await this.cacheService.set(
      dtoIn.question,
      JSON.stringify({ question, answer }),
    );
    return { question, answer };
  }

  async checkExistQuestion(question: string) {
    const questionExist = await this.questionRepository.getByQuestion(question);
    if (!questionExist) {
      throw new BadRequestException('Question not exists');
    }
    return questionExist;
  }
}
