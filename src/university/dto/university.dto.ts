import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateDto {
  @IsString()
  title: string;
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
  // @IsNumber()
  // pageSize: number;
  // @IsNumber()
  // pageIndex: number;

  @IsString()
  @IsString({ each: true })
  sortBy: string;

  @IsString()
  order: string;

  @IsString()
  @IsOptional()
  subjectId: string;
}
