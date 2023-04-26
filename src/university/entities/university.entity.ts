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
} from 'sequelize-typescript';
import { Subject } from '../../subject/entities/subject.entity';
import { User } from '../../auth/entities/user.entity';

@Table({
  timestamps: true,
  createdAt: true,
  updatedAt: true,
})
export class University extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  universityId: string;

  @Column(DataType.STRING(250))
  title: string;

  @HasMany(() => Subject)
  subject: Subject[];

  @HasMany(() => User)
  user: User[];
}
