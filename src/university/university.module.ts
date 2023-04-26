import { Module } from '@nestjs/common';
import { UniversityService } from './university.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { University } from './entities/university.entity';
import { UniversityRepository } from './repositories/university.repository';
import { UniversityController } from './university.controller';

@Module({
  imports: [SequelizeModule.forFeature([University])],
  // controllers: [SubjectController],
  providers: [UniversityService, UniversityRepository],
  exports: [UniversityService, UniversityRepository],
  controllers: [UniversityController],
})
export class UniversityModule {}
