import {
  Column,
  Model,
  Table,
  PrimaryKey,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { Question } from '../../question/entities/question.entity';
import { University } from '../../university/entities/university.entity';
import { User } from '../../auth/entities/user.entity';
import { UserSubject } from './userSubject.entity';

@Table({
  timestamps: true,
  createdAt: true,
  updatedAt: true,
})
export class Subject extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  subjectId: string;

  @Column(DataType.STRING(250))
  title: string;

  @HasMany(() => Question)
  question: Question[];

  @BelongsTo(() => University)
  university: University;

  @ForeignKey(() => University)
  @Column({ type: DataType.UUID })
  universityId: string;

  @BelongsToMany(() => User, () => UserSubject)
  users: User[];
  // @HasMany(() => User)
  // user: User[];

  // @ForeignKey(() => User)
  // userId: string;
  //
  // @BelongsToMany(() => User, () => UserSubjects)
  // users: User[];
}
