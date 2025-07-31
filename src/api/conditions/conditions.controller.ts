import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { ConditionsService } from './conditions.service';
import { CreateConditionDto } from './dto/create-condition.dto';
import { UpdateConditionDto } from './dto/update-condition.dto';

@Controller('conditions')
@UsePipes(new ValidationPipe())
export class ConditionsController {
  constructor(private readonly conditionsService: ConditionsService) {}

  @Post()
  create(@Body() createConditionDto: CreateConditionDto) {
    return this.conditionsService.create(createConditionDto);
  }

  @Get()
  findAll() {
    return this.conditionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conditionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConditionDto: UpdateConditionDto) {
    return this.conditionsService.update(+id, updateConditionDto);
  }

  // conditions.controller.ts
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.conditionsService.delete(id); // 🔁 Este debe ser el del ConditionsService
  }
}
