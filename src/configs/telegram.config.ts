import { ConfigService } from '@nestjs/config';
import { ITelegramOptions } from '../telegram/telegram.interface';

export const getTelegramConfig = (
  configService: ConfigService,
): ITelegramOptions => {
  const token = configService.get('TELEGRAM_TOKEN');
  console.log('token000000000000000000000000000000000', token);
  // if (!token) {
  //   throw new Error('Telegram token not provided');
  // }
  return {
    token: token,
    chatId: configService.get('CHAT_ID') || '',
  };
};
