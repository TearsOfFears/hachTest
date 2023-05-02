import {
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsEmail,
  IsUUID,
} from 'class-validator';

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
  @IsNumber()
  @IsOptional()
  chatId?: number | null;
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
export class EmailCheckDto {
  @IsString()
  email: string;
}

export type UserCredentians = CreateUserDto & 'refreshToken';
