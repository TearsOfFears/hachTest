import { Context, Telegraf } from 'telegraf';
import {
  Update,
  Start,
  Hears,
  InjectBot,
  Message,
  Ctx,
  Action,
  Use,
} from 'nestjs-telegraf';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { ContextTelegram } from './telegram.interface';
import { actionButtons } from './telegram.buttons';

@Injectable()
@Update()
export class TelegramService {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly authService: AuthService,
  ) {}

  @Start()
  async start(@Ctx() ctx: ContextTelegram) {
    await ctx.reply(
      'Hello student!This bot help you to read test page. Please, set up your email',
      actionButtons(),
    );
  }
  @Action('email')
  async email(@Ctx() ctx: ContextTelegram) {
    await ctx.reply(`Please, provide your valid email:`);
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
      `Your email and password for login to website:\nemail: ${ctx.message.text}\npassword: ${password}`,
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
  }
}
