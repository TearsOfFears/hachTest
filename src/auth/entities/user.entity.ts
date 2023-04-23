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
export class User extends Model<User> {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  userId: string;

  @Column(DataType.STRING(150))
  email: string;

  @Column(DataType.STRING(150))
  passwordHash: string;

  @Column(DataType.STRING(150))
  refreshToken: string;

  @Column(DataType.BIGINT)
  chatId: number;
}
