import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '../../auth/entities/user.entity';
import { Subject } from './subject.entity';

@Table({
  timestamps: true,
  createdAt: true,
  updatedAt: true,
})
export class UserSubject extends Model<UserSubject> {
  @ForeignKey(() => User)
  @Column
  userId: number;
  @ForeignKey(() => Subject)
  @Column
  subjectId: number;
}
