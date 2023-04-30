import {
  Column,
  Model,
  Table,
  PrimaryKey,
  DataType,
  HasOne,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { University } from '../../university/entities/university.entity';
import { Question } from '../../question/entities/question.entity';

@Table({
  timestamps: true,
  createdAt: true,
  updatedAt: true,
  defaultScope: {
    attributes: {
      exclude: ['passwordHash', 'refreshToken'],
    },
    order: [['userId', 'DESC']],
  },
  scopes: {
    withPasswordAndRefresh: {
      attributes: {
        include: ['passwordHash', 'refreshToken'],
      },
    },
  },
})
export class User extends Model<User> {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  userId: string;

  @Column(DataType.STRING(150))
  email: string;

  @Column(DataType.STRING(20))
  name: string;

  @BelongsTo(() => University)
  university: University;

  @ForeignKey(() => University)
  @Column({ type: DataType.UUID })
  universityId: string;

  @Column(DataType.STRING(150))
  passwordHash: string;

  @Column(DataType.STRING(150))
  refreshToken: string;

  @Column(DataType.BIGINT)
  chatId: number;
}
