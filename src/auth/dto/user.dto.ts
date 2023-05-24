import {
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsEmail,
  IsUUID,
  IsArray,
} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { User, USER_FULL } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  name?: string;
  @IsEmail()
  email: string;
  @IsUUID()
  universityId: string;
  @IsString()
  password?: string;
  @IsString()
  @IsOptional()
  passwordHash?: string;

  @IsArray()
  @IsOptional()
  subjectArrayId?: string[];
  @IsNumber()
  @IsOptional()
  chatId?: number | null;
}

@Exclude()
export class ResponseUserDto {
  constructor(partial: User) {
    Object.assign(this, partial);
  }
  @IsString()
  name: string;

  // @Expose({ groups: [USER_FULL] })
  @IsEmail()
  email: string;

  // @Expose({ groups: [USER_FULL] })
  @IsUUID()
  universityId: string;

  @Exclude({ toPlainOnly: true })
  passwordHash: string;

  @Exclude({ toPlainOnly: true })
  refreshToken: string;

  @IsArray()
  @IsOptional()
  subjectArrayId: string[];

  @IsNumber()
  @IsOptional()
  // @Exclude()
  chatId: number;
}

export class PageInfo {
  @IsNumber()
  pageSize: number;
  @IsNumber()
  pageIndex: number;

  @IsNumber()
  @IsOptional()
  pageTotal?: number;
}

export class FindDto {
  @IsObject({ each: true })
  pageInfo: PageInfo;

  @IsString()
  @IsString({ each: true })
  sortBy: string;

  @IsString()
  order: string;

  @IsString()
  @IsOptional()
  universityId: string;
}
export class LoginUserDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}

export class LogoutUserDto {
  @IsUUID()
  userId: string;
}
export class ConfirmPasswordDto {
  @IsUUID()
  userId: string;
  @IsString()
  password: string;
}
export class EmailCheckDto {
  @IsString()
  email: string;
}

export type UserCredentians = CreateUserDto & 'refreshToken';
