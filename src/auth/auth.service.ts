import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { ConfigService } from '@nestjs/config';
import { ITokens } from './dto/tokens.dto';
import { IRefreshUser } from './interfaces/user.interaface';
import { RegisterUserDto } from './dtoOut/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  async create(dtoIn: CreateUserDto) {
    const oldUser = await this.userRepository.getByEmail(dtoIn.email);
    if (oldUser) {
      throw new BadRequestException('User with this email already exist');
    }
    dtoIn.passwordHash = this.hashData(dtoIn.password);
    delete dtoIn.password;
    const user = await this.userRepository.create(dtoIn);
    const tokens = await this.getTokens(user.userId, user.email);
    await this.updateRefreshToken(user.userId, tokens.refreshToken);
    return {
      ...user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
  async refreshTokens(refreshToken: string): Promise<IRefreshUser> {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token doest not present');
    }
    let userDataValidate;
    try {
      userDataValidate = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_SECRET_REFRESH'),
      });
    } catch (e) {
      throw new UnauthorizedException('Token expire');
    }
    const user = await this.userRepository.getByEmail(userDataValidate.email);
    if (!user) {
      throw new UnauthorizedException('Not found user');
    }
    const tokens = await this.getTokens(user.userId, user.email);
    await this.updateRefreshToken(user.userId, tokens.refreshToken);
    return { user, tokens };
  }
  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.getByEmail(email);
    if (!user) {
      throw new HttpException(
        'User with this email not exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }
  async validateUser(
    email: string,
    password: string,
  ): Promise<Pick<User, 'email'>> {
    const user = await this.userRepository.getByEmail(email);
    if (!user) {
      throw new UnauthorizedException('user with this cred not found');
    }
    const isEqualPassword = compareSync(password, user.passwordHash);
    if (!isEqualPassword) {
      throw new UnauthorizedException(
        'something wrong with credential tha you pass',
      );
    }
    return {
      email: user.email,
    };
  }
  async login(email: string) {
    const user = await this.userRepository.getByEmail(email);
    const tokens = await this.getTokens(user.userId, user.email);
    const userUpdated = await this.updateRefreshToken(
      user.userId,
      tokens.refreshToken,
    );
    delete userUpdated.refreshToken;
    delete userUpdated.passwordHash;
    return {
      userUpdated,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
  async logout(userId: string) {
    await this.userRepository.updateByUserId(userId, {
      refreshToken: null,
    });
  }
  async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<User> {
    const hashedRefreshToken = await this.hashData(refreshToken);
    return await this.userRepository.updateByUserId(userId, {
      refreshToken: hashedRefreshToken,
    });
  }
  async getTokens(userId: string, email: string): Promise<ITokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync({
        userId,
        email,
      }),
      this.jwtService.sign(
        {
          userId,
          email,
        },
        {
          expiresIn: '5m',
          secret: this.configService.get('JWT_SECRET_REFRESH'),
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
  hashData(dtoIn: any) {
    const salt = genSaltSync(10);
    return hashSync(dtoIn, salt);
  }
}
