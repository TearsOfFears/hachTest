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
export class Subject extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUID })
  subject_id: string;

  @Column(DataType.STRING(20000))
  title: string;

  @Column(DataType.STRING(20000))
  university: string;
}
