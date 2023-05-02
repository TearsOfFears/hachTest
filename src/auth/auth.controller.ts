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
} from '@nestjs/common';
import {
  CreateUserDto,
  FindDto,
  LoginUserDto,
  LogoutUserDto,
} from './dto/user.dto';
import { AuthService } from './auth.service';
import { UserRepository } from './repositories/user.repository';
import { Response, Request } from 'express';
import { ITokens } from './dto/tokens.dto';
import { JwtGuard } from '../guards/jwt.guard';
import { IRefreshUser } from './interfaces/user.interaface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {}

  @Post('register')
  async register(
    @Body() dtoIn: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.create(dtoIn);
    response.cookie('refreshToken', user.refreshToken, {
      httpOnly: true,
    });
    return user;
  }
  @HttpCode(200)
  @Post('login')
  async login(
    @Body() dtoIn: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.validateUser(dtoIn.email, dtoIn.password);
    const user = await this.authService.login(dtoIn.email);
    response.cookie('refreshToken', user.refreshToken, {
      httpOnly: true,
      domain: 'http://127.0.0.1/',
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
  @Get('emailCheck/:email')
  async emailCheck(@Param('email') email: string) {
    return this.authService.getUserByEmail(email);
  }
  @HttpCode(200)
  @Post('refresh')
  async refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { user, tokens }: IRefreshUser = await this.authService.refreshTokens(
      request.cookies.refreshToken,
    );
    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
    });
    return { user, accessToken: tokens.accessToken };
  }
  @UseGuards(JwtGuard)
  @Get('find')
  async find(@Body() dtoIn: FindDto) {
    return await this.userRepository.findAll(dtoIn);
  }
  @UseGuards(JwtGuard)
  @Get(':userId')
  async getById(@Param('userId') userId: string) {
    // console.log(dtoIn.pageSize);
    const user = await this.userRepository.getByUserId(userId);
    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}
