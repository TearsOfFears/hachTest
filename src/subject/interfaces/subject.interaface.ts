import { Subject } from '../entities/subject.entity';

export interface IUser {
  name?: string;
  email: string;
  universityId: string;
  password?: string;
  passwordHash?: string;
  refreshToken?: string;
  chatId?: number;
}
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
  items: Subject[];
  pageInfo: PageInfo;
}
