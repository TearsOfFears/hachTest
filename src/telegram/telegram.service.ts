import { Context, Markup, Telegraf } from 'telegraf';
import {
  Update,
  Start,
  Hears,
  InjectBot,
  Message,
  Ctx,
  Action,
  Use,
  On,
  Command,
} from 'nestjs-telegraf';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/services/auth.service';
import { ContextTelegram } from './telegram.interface';
import { actionButtons } from './telegram.buttons';
import { UniversityRepository } from '../university/repositories/university.repository';
import { IFindAllOut } from '../university/interfaces/university.interfaces';
import { log } from 'util';

@Injectable()
@Update()
export class TelegramService {
  private universityId: string;
  private universityArray;
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly authService: AuthService,
    private readonly universityRepository: UniversityRepository,
  ) {
    this.universityId = null;
    this.universityArray = [];
  }

  @Start()
  async start(@Ctx() ctx: ContextTelegram) {
    await ctx.reply(
      'Hello student! This bot help you to read test page. Please, set up your email',
      Markup.inlineKeyboard([
        Markup.button.callback('Set up University', 'university'),
      ]),
    );
  }
  @Action('university')
  async university(@Ctx() ctx: ContextTelegram) {
    const universityArr = await this.universityRepository.findAll({
      sortBy: 'createdAt',
      order: 'asc',
    });
    const renderArr = universityArr.items.map(({ title, universityId }) => {
      return [
        {
          name: title,
          text: title,
          callback_data: universityId,
        },
      ];
    });
    this.universityArray = universityArr.items;
    await ctx.reply('Please select a university', {
      reply_markup: {
        inline_keyboard: renderArr,
      },
    });
  }
  @Action(/^.*-.*$/)
  async onUniversitySelection(ctx) {
    const selectedUniversityId = ctx.callbackQuery.data;
    this.universityId = selectedUniversityId;
    const selectedUniversity = this.universityArray.find(
      (university) => university.universityId === selectedUniversityId,
    );
    await ctx.reply(
      `You have selected: ${selectedUniversity.dataValues.title}`,
    );
    await ctx.reply(`Please write your valid email: `);
  }
  @Use()
  async reply(@Message('text') message: string, @Ctx() ctx: ContextTelegram) {
    const password = Math.random().toString(36).slice(-10);
    const userDto = {
      name: ctx.message.chat.username,
      email: ctx.message.text,
      password,
      chatId: ctx.message.chat.id,
      universityId: this.universityId,
    };
    let user;
    try {
      user = await this.authService.create(userDto);
    } catch (e) {
      await ctx.reply(e.message);
      await this.start(ctx);
    }
    if (user) {
      await ctx.replyWithHTML(
        `Your email and password for login to website:\nemail: ${ctx.message.text}\npassword: ${password}`,
      );
    }
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
