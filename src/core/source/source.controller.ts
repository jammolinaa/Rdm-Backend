import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SourceService } from './source.service';
import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';

@Controller('/core/sources')
export class SourceController {
  constructor(private readonly sourceService: SourceService) {}

  @Post()
  create(@Body() dto: CreateSourceDto) {
    return this.sourceService.create(dto);
  }

  @Get()
  findAll() {
    return this.sourceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sourceService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSourceDto) {
    return this.sourceService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sourceService.remove(id);
  }
}
