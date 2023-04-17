import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Subject } from './entities/subject.entity';
import { SubjectRepository } from './repositories/subject.repository';

@Module({
  imports: [SequelizeModule.forFeature([Subject])],
  controllers: [QuestionController],
  providers: [QuestionService, SubjectRepository],
  exports: [SubjectRepository],
})
export class SubjectModule {}
