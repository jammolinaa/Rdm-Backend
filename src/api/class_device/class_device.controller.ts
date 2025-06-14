import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClassDeviceService } from './class_device.service';
import { CreateClassDeviceDto } from './dto/create-class_device.dto';
import { UpdateClassDeviceDto } from './dto/update-class_device.dto';

@Controller('class-device')
export class ClassDeviceController {
  constructor(private readonly classDeviceService: ClassDeviceService) {}

  @Post()
  create(@Body() createClassDeviceDto: CreateClassDeviceDto) {
    return this.classDeviceService.create(createClassDeviceDto);
  }

  @Get()
  findAll() {
    return this.classDeviceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classDeviceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassDeviceDto: UpdateClassDeviceDto) {
    return this.classDeviceService.update(+id, updateClassDeviceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classDeviceService.remove(+id);
  }
}
