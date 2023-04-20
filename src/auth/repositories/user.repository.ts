import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/user.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async create(dto): Promise<User> {
    return await this.userModel.create(dto);
  }
  // async getByEmail(email: string): Promise<User> {
  //   return this.userModel.findOne({ email: email });
  // }
}
