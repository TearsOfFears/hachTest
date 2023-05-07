import {
  IsArray,
  ValidateNested,
  IsNumber,
  IsObject,
  IsString,
  IsOptional,
} from 'class-validator';
import { Question } from '../entities/question.entity';
import { Answer } from '../entities/answer.entity';

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
  @IsNumber()
  pageSize: number;
  @IsNumber()
  pageIndex: number;

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
