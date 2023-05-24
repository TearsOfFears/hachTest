import {
  Controller,
  Post,
  HttpCode,
  Body,
  Req,
  Res,
  Param,
  Get,
  UseGuards,
  HttpException,
  HttpStatus,
  SerializeOptions,
  Patch,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import {
  ConfirmPasswordDto,
  CreateUserDto,
  FindDto,
  LoginUserDto,
  LogoutUserDto,
  ResponseUserDto,
} from './dto/user.dto';
import { AuthService } from './services/auth.service';
import { UserRepository } from './repositories/user.repository';
import { Response, Request } from 'express';
import { JwtGuard } from '../guards/jwt.guard';
import { IFindAllOut, IRefreshUser } from './interfaces/user.interaface';
import { RegisterUserDto } from './dtoOut/user.dto';
import { TextTransformPipe } from '../pipes/textTransform.pipe';
import { UpdateSubjectsDto } from '../question/dto/question.dto';
import { EmailService } from '../mailer/mailer.service';
import { User, USER_FULL } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService,
  ) {}

  @Post('register')
  async register(
    @Body() dtoIn: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { user, refreshToken } = await this.authService.create(dtoIn);
    await this.emailService.sendConfirmMail(user);
    response.cookie('refreshToken', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    delete user.refreshToken;
    return user;
  }
  @HttpCode(200)
  @Post('login')
  @SerializeOptions({
    groups: [USER_FULL],
  })
  async login(
    @Body() dtoIn: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.validateUser(dtoIn.email, dtoIn.password);
    const user = await this.authService.login(dtoIn.email);
    response.cookie('refreshToken', user.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    return {
      ...user.userUpdated,
      accessToken: user.accessToken,
    };
  }
  @HttpCode(200)
  @Post('logout')
  async logout(
    @Body() dtoIn: LogoutUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.logout(dtoIn.userId);
    response.clearCookie('refreshToken');
  }

  @HttpCode(200)
  @Get('restorePassword/:email')
  @SerializeOptions({
    groups: [USER_FULL],
  })
  async restorePassword(@Param('email') email: string) {
    const user = await this.authService.getUserByEmail(email);
    await this.emailService.sendRestoreMail(user);
  }

  @HttpCode(200)
  @Patch('confirmPassword')
  async confirmPassword(@Body() dtoIn: ConfirmPasswordDto) {
    return this.authService.confirmRestorePassword(dtoIn);
  }

  @HttpCode(200)
  @Post('activate/:userId')
  async activate(@Param('userId') userId: string) {
    return this.authService.setConfirmMail(userId);
  }

  @HttpCode(200)
  @Get('emailCheck/:email')
  async emailCheck(@Param('email') email: string) {
    return this.authService.getUserByEmail(email);
  }

  @HttpCode(200)
  @Get('refresh')
  async refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { user, tokens }: IRefreshUser = await this.authService.refreshTokens(
      request.cookies.refreshToken,
    );
    response.cookie('refreshToken', user.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    return { accessToken: tokens.accessToken, ...user };
  }
  @UseGuards(JwtGuard)
  @Patch('updateSubjects/:userId')
  async updateSubjects(
    @Param('userId') userId: string,
    @Body() dtoIn: UpdateSubjectsDto,
  ) {
    return this.authService.updateUser(userId, {
      subjectArrayId: dtoIn.subjectArrayId,
    });
  }
  @UseGuards(JwtGuard)
  @Get('find')
  async find(@Body() dtoIn: FindDto): Promise<IFindAllOut> {
    return await this.userRepository.findAll(dtoIn);
  }

  // @SerializeOptions({
  //   groups: [USER_FULL],
  // })
  @UseGuards(JwtGuard)
  @Get(':userId')
  async getById(@Param('userId') userId: string): Promise<ResponseUserDto> {
    const user = await this.userRepository.getByUserId(userId);
    if (user) {
      return user;
    } else {
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
    }
  }
}
