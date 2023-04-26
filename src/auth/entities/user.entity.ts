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
})
export class User extends Model<User> {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  userId: string;

  @Column(DataType.STRING(150))
  email: string;

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
