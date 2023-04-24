import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  UsePipes,
  UseInterceptors,
} from '@nestjs/common';
import { QuestionService } from './services/question.service';
import { CreateDto, FindDto } from './dto/question.dto';
import { QuestionRepository } from './repositories/question.repository';
import { TelegramService } from '../telegram/telegram.service';
import { AuthService } from '../auth/auth.service';
import { JwtGuard } from '../guards/jwt.guard';
import { TextTransformPipe } from '../pipes/textTransform.pipe';

@Controller('question')
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private readonly questionRepository: QuestionRepository,
    private readonly telegramService: TelegramService,
    private readonly authService: AuthService,
  ) {}
  @UseGuards(JwtGuard)
  @UsePipes(new TextTransformPipe())
  @Post('create')
  async create(@Body() dtoIn: Omit<CreateDto, 'answerId'>) {
    const user = await this.authService.getUserByEmail(dtoIn.email);
    const dtoOut = await this.questionService.createAndGetAnswer(dtoIn);
    await this.telegramService.sendMessage(
      dtoOut.question.question,
      dtoOut.question.variants,
      dtoOut.answer.answerChatGpt,
      user.chatId,
    );
    return dtoOut.question;
  }
  @UseGuards(JwtGuard)
  @Get('find')
  async find(@Body() dtoIn: FindDto) {
    const a = await this.questionRepository.findAll(dtoIn);
    return a;
  }
}
