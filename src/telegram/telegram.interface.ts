import { Context as ContextTelegraf } from 'telegraf';

export interface ITelegramOptions {
  token: string;
}
export interface ContextTelegram extends ContextTelegraf {
  message;
}
