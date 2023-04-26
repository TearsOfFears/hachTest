import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { getSequelizeConfig } from './configs/sequelize.config';
import { QuestionModule } from './question/question.module';
import { SubjectModule } from './subject/subject.module';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import { UniversityModule } from './university/university.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({ isGlobal: true, ttl: 60 * 60 * 24 }),
    SequelizeModule.forRootAsync(getSequelizeConfig()),
    QuestionModule,
    SubjectModule,
    AuthModule,
    UniversityModule,
  ],
})
export class AppModule {}
