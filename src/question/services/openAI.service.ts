import { OpenAIClient } from '@platohq/nestjs-openai';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CONSTANT_OPEN_AI } from '../constants/openAi.constants';

@Injectable()
export class OpenAIService {
  constructor(private readonly openAIClient: OpenAIClient) {}

  async createCompletion(prompt: string) {
    try {
      const { data } = await this.openAIClient.createCompletion({
        ...CONSTANT_OPEN_AI,
        prompt,
      });
      return data;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
