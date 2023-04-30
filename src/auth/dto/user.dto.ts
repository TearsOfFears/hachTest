import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name?: string;
  @IsString()
  email: string;
  @IsString()
  universityId: string;
  @IsString()
  password?: string;
  @IsString()
  @IsOptional()
  passwordHash?: string;
  @IsNumber()
  chatId?: number;
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
  @IsString()
  email: string;
  @IsString()
  password: string;
}

export class EmailCheckDto {
  @IsString()
  email: string;
}

export type UserCredentians = CreateUserDto & 'refreshToken';
