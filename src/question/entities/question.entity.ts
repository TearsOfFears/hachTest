import {
  Column,
  Model,
  Table,
  PrimaryKey,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Answer } from './answer.entity';
import { Subject } from '../../subject/entities/subject.entity';

@Table({
  timestamps: true,
  createdAt: true,
  updatedAt: true,
})
export class Question extends Model<Question> {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  question_id: string;

  @Column(DataType.STRING(100))
  question: string;

  @Column(DataType.STRING(100))
  subject: string;

  @ForeignKey(() => Answer)
  @Column({ type: DataType.UUID })
  answer_id: string;

  @ForeignKey(() => Subject)
  @Column({ type: DataType.UUID })
  subject_id: string;
}
