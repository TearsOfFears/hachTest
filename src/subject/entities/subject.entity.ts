import {
  Column,
  Model,
  Table,
  PrimaryKey,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { Question } from '../../question/entities/question.entity';

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

  @Column(DataType.STRING(20000))
  university: string;

  @HasMany(() => Question)
  question: Question[];
}
