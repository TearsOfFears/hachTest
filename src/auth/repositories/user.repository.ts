import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async create(dto): Promise<User> {
    return this.userModel.create(dto);
  }
  async getByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ where: { email } });
  }
  async updateByUserId(userId: string, refreshToken: string) {
    console.log(refreshToken);
    const user = await this.userModel.update<User>(
      { refreshToken },
      { where: { userId }, returning: true },
    );
    console.log(user[1]);
    // const { passwordHash, ...dtoOut } = user[1].dataValues;
    // return dtoOut;
    return user;
  }
}
