import {
  Controller,
  Post,
  HttpCode,
  Body,
  BadRequestException,
  Req,
  Res,
  Param,
  Get,
  UseGuards,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto, FindDto, LoginUserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { UserRepository } from './repositories/user.repository';
import { Response, Request } from 'express';
import { ITokens } from './dto/tokens.dto';
import { JwtGuard } from '../guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {}

  @Post('register')
  async register(@Body() dtoIn: CreateUserDto) {
    return this.authService.create(dtoIn);
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
    });
    return {
      ...user.userUpdated,
      accessToken: user.accessToken,
    };
  }
  @HttpCode(200)
  @Get('emailCheck/:email')
  async emailCheck(@Param('email') email: string) {
    return this.authService.getUserByEmail(email);
  }
  @HttpCode(200)
  @Post('refreshToken')
  async refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const dtoOut: ITokens = await this.authService.refreshTokens(
      request.cookies.refreshToken,
    );
    response.cookie('refreshToken', dtoOut.refreshToken, {
      httpOnly: true,
    });
    return { accessToken: dtoOut.accessToken };
  }
  @UseGuards(JwtGuard)
  @Get('find')
  async find(@Body() dtoIn: FindDto) {
    return await this.userRepository.findAll(dtoIn);
  }
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
