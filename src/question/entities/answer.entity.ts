import {
  Column,
  Model,
  Table,
  PrimaryKey,
  DataType,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  createdAt: true,
  updatedAt: true,
})
export class Answer extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  answer_id: string;

  @Column(DataType.STRING(20000))
  answer_chat_gpt: string;

  @Column(DataType.STRING(20000))
  answer_from_human: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  is_human_valid_answer: boolean;
}
