import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../entities/user.entity';
import { FindDto } from '../../question/dto/question.dto';
import { FindOptions } from 'sequelize';
import { University } from '../../university/entities/university.entity';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async create(dto): Promise<User> {
    return this.userModel.create(dto);
  }
  async getByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ where: { email } });
  }
  async updateByUserId(
    userId: string,
    refreshToken: string,
  ): Promise<Omit<User, 'passwordHash'>> {
    const [first, user] = await this.userModel.update<User>(
      { refreshToken },
      { where: { userId }, returning: true },
    );
    const { passwordHash, ...dtoOut } = user[0].dataValues;
    return user[0].dataValues;
  }
  async findAll(dtoIn: FindDto) {
    // const offset: number = dtoIn.pageInfo.pageSize * dtoIn.pageInfo.pageIndex;
    // const limit: number = dtoIn.pageInfo.pageSize;

    const options: FindOptions = {
      // limit,
      // offset,
      // order: [[dtoIn.sortBy, dtoIn.order]],
      include: [
        {
          model: University,
        },
      ],
    };

    // if (dtoIn.subjectId) {
    //   options.where = { subjectId: dtoIn.subjectId };
    // }

    // const items: Subject[] = await this.subjectModel.findAll(options);
    // return {
    //   items,
    //   pageInfo: {
    //     pageTotal: items.length,
    //     pageSize: dtoIn.pageInfo.pageSize,
    //     pageIndex: dtoIn.pageInfo.pageIndex,
    //   },
    // };
    return await this.userModel.findAll(options);
  }
}
