import { IsString } from 'class-validator';

export class CreateDto {
  @IsString()
  question: string;

  @IsString()
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
