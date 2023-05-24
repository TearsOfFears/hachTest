import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../entities/user.entity';
import { FindOptions } from 'sequelize';
import { University } from '../../university/entities/university.entity';
import { IFind, IFindAllOut } from '../interfaces/user.interaface';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async create(dto): Promise<User> {
    const user = await this.userModel.create(dto);
    return user?.dataValues;
  }
  async getByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ where: { email } });
    return user?.dataValues;
  }
  async getByUserId(userId: string): Promise<User | null> {
    const user = await this.userModel.findByPk(userId);
    return user?.dataValues;
  }
  async updateByUserId(userId: string, fieldUpdate: any): Promise<User> {
    const [_, user] = await this.userModel.update<User>(fieldUpdate, {
      where: { userId },
      returning: true,
    });
    return user[0]?.dataValues;
  }
  async updateByEmail(email: string, fieldUpdate: any): Promise<User> {
    const [_, user] = await this.userModel.update<User>(fieldUpdate, {
      where: { email },
      returning: true,
    });
    return user[0]?.dataValues;
  }
  async findAll(dtoIn: IFind): Promise<IFindAllOut> {
    const offset: number = dtoIn.pageInfo.pageSize * dtoIn.pageInfo.pageIndex;
    const limit: number = dtoIn.pageInfo.pageSize;

    const options: FindOptions = {
      limit,
      offset,
      order: [[dtoIn.sortBy, dtoIn.order]],
      // include: [
      //   {
      //     model: University,
      //   },
      // ],
      // attributes: { exclude: ['passwordHash', 'refreshToken'] },
    };

    if (dtoIn.universityId) {
      options.where = { universityId: dtoIn.universityId };
    }

    const items: User[] = await this.userModel.findAll(options);
    return {
      items,
      pageInfo: {
        pageTotal: items.length,
        pageSize: dtoIn.pageInfo.pageSize,
        pageIndex: dtoIn.pageInfo.pageIndex,
      },
    };
  }
}
