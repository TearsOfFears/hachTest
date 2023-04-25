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
} from '@nestjs/common';
import { CreateUserDto, EmailCheckDto, LoginUserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { UserRepository } from './repositories/user.repository';
import { Response, Request } from 'express';
import { ITokens } from './dto/tokens.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {}

  @Post('register')
  async register(@Body() dtoIn: CreateUserDto) {
    const oldUser = await this.userRepository.getByEmail(dtoIn.email);
    if (oldUser) {
      throw new BadRequestException('User with this email aldready exist');
    }
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
    response.cookie('jwt_refresh', user.refresh_token, {
      httpOnly: true,
    });
    return user;
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
      request.cookies.jwt_refresh,
    );
    response.cookie('jwt_refresh', dtoOut.refreshToken, {
      httpOnly: true,
    });
  }
}
