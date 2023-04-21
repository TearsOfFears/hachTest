import {
  IsArray,
  ValidateNested,
  IsNumber,
  IsObject,
  IsString,
  IsOptional,
} from 'class-validator';
import { Question } from '../entities/question.entity';

export class CreateDto {
  @IsString()
  answerId?: string;

  @IsString()
  question: string;

  @IsString()
  email: string;

  @IsArray({ each: true })
  variants: string[];

  @IsString()
  subjectId: string;
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
  subjectId: string;
}
export class UpdateDto {
  @IsString()
  questionId: string;

  @IsString()
  question: string;

  @IsString()
  subjectId: string;
}

export class FindAllOut {
  items: Question[];
  pageInfo: PageInfo;
}
