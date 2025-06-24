import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateLastValueDto } from './dto/create-last_value.dto';
import { UpdateLastValueDto } from './dto/update-last_value.dto';
import { LastValueService } from './last_value.service';

@Controller('last_value')
@UsePipes(new ValidationPipe())
export class LastValueController {
  constructor(private readonly lastValueService: LastValueService) {}

  @Post()
  create(@Body() createLastValueDto: CreateLastValueDto) {
    return this.lastValueService.create(createLastValueDto);
  }

  @Get()
  findAll() {
    return this.lastValueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lastValueService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLastValueDto: UpdateLastValueDto,
  ) {
    return this.lastValueService.update(+id, updateLastValueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lastValueService.remove(+id);
  }
}
