import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { getSequelizeConfig } from './configs/sequelize';
import { QuestionModule } from './question/question.module';
import { SubjectModule } from './subject/subject.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync(getSequelizeConfig()),
    QuestionModule,
    SubjectModule,
  ],
  // providers: [],
})
export class AppModule {}
