import { Context, Telegraf } from 'telegraf';
import { Update, Start, Hears, InjectBot } from 'nestjs-telegraf';
import { Injectable } from '@nestjs/common';

@Injectable()
@Update()
export class TelegramService {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}

  @Start()
  async start(ctx: Context) {
    const chatId = ctx.message.chat.id;
    console.log('chatId', chatId);
    await ctx.reply('Hello lox');
  }

  async sendMessage(question: string, variants: string, ctx: Context) {
    const chatId = ctx.message.chat.id;
    await this.bot.telegram.sendMessage(chatId, question + variants);
    // await ctx.reply(question + variants)
  }

  @Hears('hi')
  async reply(ctx: Context) {
    await ctx.reply(`You say ${ctx.message}`);
  }
}
