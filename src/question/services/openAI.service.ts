import { OpenAIClient } from '@platohq/nestjs-openai';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OpenAIService {
  constructor(private readonly openAIClient: OpenAIClient) {}

  async createCompletion(prompt: string) {
    try {
      const { data } = await this.openAIClient.createCompletion({
        model: 'text-davinci-003',
        max_tokens: 1000,
        temperature: 0.8,
        prompt,
      });
      return data;
    } catch (e) {
      console.log('err', e);
    }
  }
}
