import { Module } from '@nestjs/common';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Subject } from './entities/subject.entity';
import { SubjectRepository } from './repositories/subject.repository';

@Module({
  imports: [SequelizeModule.forFeature([Subject])],
  controllers: [SubjectController],
  providers: [SubjectService, SubjectRepository],
  exports: [SubjectService, SubjectRepository],
})
export class SubjectModule {}
