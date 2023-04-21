import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  async create(dtoIn: CreateUserDto) {
    const salt = genSaltSync(10);
    dtoIn.passwordHash = hashSync(dtoIn.password, salt);
    delete dtoIn.password;
    return this.userRepository.create(dtoIn);
  }
  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.getByEmail(email);
    if (!user) {
      throw new HttpException(
        'User with this email not found',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }
  // async validateUser(
  //   email: string,
  //   password: string,
  // ): Promise<Pick<User, 'email'>> {
  //   const user = await this.userRepository.getByEmail(email);
  //   if (!user) {
  //     throw new UnauthorizedException('user with this cred not found');
  //   }
  //   const isEqualPassword = compareSync(password, user.passwordHash);
  //   if (!isEqualPassword) {
  //     throw new UnauthorizedException(
  //       'something wrong with credential tha you pass',
  //     );
  //   }
  //   return {
  //     email: user.email,
  //   };
  // }
  // async login(email: string) {
  //   const payload = { email };
  //   return {
  //     access_token: await this.jwtService.signAsync(payload),
  //   };
  // }
}
