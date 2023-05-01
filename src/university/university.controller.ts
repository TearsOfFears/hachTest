import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UniversityService } from './university.service';
import { CreateDto, FindDto } from './dto/university.dto';
import { UniversityRepository } from './repositories/university.repository';

@Controller('university')
export class UniversityController {
  constructor(
    private readonly universityService: UniversityService,
    private readonly universityRepository: UniversityRepository,
  ) {}

  @Post('create')
  async create(@Body() dtoIn: CreateDto) {
    return await this.universityService.create(dtoIn);
  }
  @Get('find')
  async find(@Query() dtoIn: FindDto) {
    return await this.universityRepository.findAll(dtoIn);
  }
}
