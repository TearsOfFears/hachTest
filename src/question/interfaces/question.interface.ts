import { Question } from '../entities/question.entity';

export interface PageInfo {
  pageSize: number;
  pageIndex: number;
  pageTotal?: number;
}

export interface IFind {
  pageInfo: PageInfo;
  sortBy: string;
  order: string;
  subjectId: string;
}

export interface IFindAllOut {
  items: Question[];
  pageInfo: PageInfo;
}
