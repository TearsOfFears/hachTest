import { ConfigService } from '@nestjs/config';
import { OpenAIModuleOptions } from '@platohq/nestjs-openai';

export const getOpenAiConfig = (
  configService: ConfigService,
): OpenAIModuleOptions => {
  return {
    apiKey: configService.get('CHATGPT_API_SECRET'),
  };
};
