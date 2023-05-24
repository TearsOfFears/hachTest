import {
  Column,
  Model,
  Table,
  PrimaryKey,
  DataType,
  ForeignKey,
  BelongsTo,
  Index,
} from 'sequelize-typescript';
import { Answer } from './answer.entity';
import { Subject } from '../../subject/entities/subject.entity';

@Table({
  timestamps: true,
  createdAt: true,
  updatedAt: true,
  indexes: [
    {
      fields: ['question_vector'],
      using: 'gin',
    },
  ],
})
export class Question extends Model<Question> {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  questionId: string;

  @Column({ type: DataType.STRING })
  question: string;

  @Column({ type: DataType.TSVECTOR })
  question_vector: any;

  @Column(DataType.ARRAY(DataType.STRING))
  variants: string[];

  @BelongsTo(() => Answer)
  answer: Answer;

  @ForeignKey(() => Answer)
  @Column({ type: DataType.UUID })
  answerId: string;

  @BelongsTo(() => Subject)
  subject: Subject;

  @ForeignKey(() => Subject)
  @Column({ type: DataType.UUID })
  subjectId: string;
}
