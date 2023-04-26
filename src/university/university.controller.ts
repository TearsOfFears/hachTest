import { Body, Controller, Post } from '@nestjs/common';
import { UniversityService } from './university.service';
import { CreateDto } from './dto/university.dto';

@Controller('university')
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}

  @Post('create')
  async create(@Body() dtoIn: CreateDto) {
    return await this.universityService.create(dtoIn);
  }
}
