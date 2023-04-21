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
}
