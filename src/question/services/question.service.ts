import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { QuestionRepository } from '../repositories/question.repository';
import { AnswerRepository } from '../repositories/answer.repository';
import { OpenAIService } from './openAI.service';
import { CreateDto } from '../dto/question.dto';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class QuestionService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheService: Cache,
    public readonly questionRepository: QuestionRepository,
    public readonly answerRepository: AnswerRepository,
    public readonly openAIService: OpenAIService,
    public readonly configService: ConfigService,
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
    let answer;
    // ONLY FOR DEV PUPROSE
    if (this.configService.get('NODE_ENV') === 'PROD') {
      const data = await this.openAIService.createCompletion(
        dtoIn.question + variantsParsed,
      );
      answer = await this.answerRepository.create(data.choices[0].text);
    } else {
      answer = await this.answerRepository.create('data.choices[0].text');
    }
    // ONLY FOR DEV PUPROSE

    dtoIn.answerId = answer.answerId;
    let question;
    try {
      question = await this.questionRepository.create(dtoIn);
    } catch (e) {
      console.log('e', e);
      if (
        e.name === 'SequelizeUniqueConstraintError' ||
        e.name === 'SequelizeForeignKeyConstraintError'
      ) {
        question = await this.checkExistQuestion(dtoIn.question);
      } else {
        throw new BadRequestException('Something wrong with DB', e.message);
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
    console.log('questionExist', questionExist);
    if (!questionExist) {
      throw new BadRequestException('Question not exists');
    }
    return questionExist;
  }
}
