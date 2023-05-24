import {
  Column,
  Model,
  Table,
  PrimaryKey,
  DataType,
  BelongsTo,
  ForeignKey,
  BelongsToMany,
} from 'sequelize-typescript';
import { University } from '../../university/entities/university.entity';
import { Subject } from '../../subject/entities/subject.entity';
import { UserSubject } from '../../subject/entities/userSubject.entity';
import { Exclude, Expose } from 'class-transformer';

export const USER_FULL = 'user_full';

@Exclude()
@Table({
  timestamps: true,
  createdAt: true,
  updatedAt: true,
})
export class User extends Model<User> {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  // @Expose({ groups: [USER_FULL] })
  userId: string;

  @Column(DataType.STRING(150))
  // @Expose({ groups: [USER_FULL] })
  email: string;

  @Column(DataType.STRING(20))
  // @Expose({ groups: [USER_FULL] })
  name: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  // @Exclude()
  // @Expose({ groups: [USER_FULL] })
  isActivated: boolean;

  @BelongsTo(() => University)
  // @Expose({ groups: [USER_FULL] })
  university: University;

  @ForeignKey(() => University)
  @Column({ type: DataType.UUID })
  // @Expose({ groups: [USER_FULL] })
  universityId: string;

  @BelongsToMany(() => Subject, () => UserSubject)
  // @Expose({ groups: [USER_FULL] })
  subjects: Subject[];

  @Column({ type: DataType.ARRAY(DataType.UUID) })
  // @Expose({ groups: [USER_FULL] })
  subjectArrayId: string[];

  @Column(DataType.STRING(150))
  @Exclude()
  passwordHash: string;

  @Column(DataType.STRING(150))
  @Exclude()
  refreshToken: string;

  @Column(DataType.BIGINT)
  @Exclude()
  chatId: number;
}
