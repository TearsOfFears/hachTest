import {
  Controller,
  Post,
  HttpCode,
  Body,
  UsePipes,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() dtoIn: CreateUserDto) {
    // const oldUser = await this.authService.getByEmail(dtoIn.email);
    // if (oldUser) {
    //   throw new BadRequestException('Aldready exist');
    // }
    return this.authService.create(dtoIn);
  }
  // @HttpCode(200)
  // @Post('login')
  // async login(@Body() dtoIn: CreateUserDto) {
  //   await this.authService.validateUser(dtoIn.email, dtoIn.password);
  //   return this.authService.login(dtoIn.email);
  // }
}
