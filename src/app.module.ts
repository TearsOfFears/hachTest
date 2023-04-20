import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { getSequelizeConfig } from './configs/sequelize.config';
import { QuestionModule } from './question/question.module';
import { SubjectModule } from './subject/subject.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync(getSequelizeConfig()),
    QuestionModule,
    SubjectModule,
    AuthModule,
  ],
})
export class AppModule {}
