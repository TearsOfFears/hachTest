import { ConfigService } from '@nestjs/config';
import { ITelegramOptions } from '../telegram/telegram.interface';

export const getTelegramConfig = (configService: ConfigService) => {
  const token = configService.get('TELEGRAM_BOT_TOKEN');
  // console.log('token', token);
  if (!token) {
    throw new Error('Telegram token not provided');
  }
  return {
    token: token,
    // chatId: configService.get('CHAT_ID') || '',
  };
};
