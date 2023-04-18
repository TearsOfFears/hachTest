import {
  Column,
  Model,
  Table,
  PrimaryKey,
  DataType,
  HasOne,
} from 'sequelize-typescript';
import { Question } from './question.entity';
@Table({
  timestamps: true,
  createdAt: true,
  updatedAt: true,
})
export class Answer extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  answerId: string;

  @Column(DataType.STRING(20000))
  answerChatGpt: string;

  @Column({
    type: DataType.STRING(20000),
    defaultValue:
      'Ніхто з студентів не запропонував відповідь.Будь першим!!!))',
  })
  answerFromHuman: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isHumanValidAnswer: boolean;

  @HasOne(() => Question)
  question: Question;
}
