import { Context, Telegraf } from 'telegraf';
import {
  Update,
  Start,
  Hears,
  InjectBot,
  Message,
  Ctx,
  Use,
} from 'nestjs-telegraf';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { ContextTelegram } from './telegram.interface';

@Injectable()
@Update()
export class TelegramService {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly authService: AuthService,
  ) {}

  @Start()
  async start(ctx: ContextTelegram) {
    await ctx.reply('Hello student!');
  }
  @Hears('/email')
  async wait(ctx: ContextTelegram) {
    await ctx.reply(`Input email:`);
  }
  @Use()
  async reply(@Message('text') message: string, @Ctx() ctx: ContextTelegram) {
    const password = Math.random().toString(36).slice(-10);
    const userDto = {
      name: ctx.message.chat.username,
      email: ctx.message.text,
      password,
      chatId: ctx.message.chat.id,
    };
    await this.authService.create(userDto);
    await ctx.replyWithHTML(
      `Your email and password:\nemail: ${ctx.message.text}\npassword: ${password}`,
    );
  }
  async sendMessage(
    question: string,
    variants: string[],
    answer: string,
    chatId: number,
  ) {
    let variantsParsed = '';
    variants.forEach(
      (el: string, inx: number) => (variantsParsed += `${inx + 1}. ${el}\n`),
    );
    const answerParsed =
      `Question:\n${question}\n` +
      `Variants:\n${variantsParsed}\n` +
      `Answer: ${answer}`;
    await this.bot.telegram.sendMessage(chatId, answerParsed);
    // await ctx.reply(question + variants)
  }
}
