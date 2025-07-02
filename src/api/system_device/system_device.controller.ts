import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { SystemDeviceService } from './system_device.service';
import { CreateSystemDeviceDto } from './dto/create-system_device.dto';
import { UpdateSystemDeviceDto } from './dto/update-system_device.dto';

@Controller('system_device')
@UsePipes(new ValidationPipe())
export class SystemDeviceController {
  constructor(private readonly systemDeviceService: SystemDeviceService) {}

  @Post()
  create(@Body() createSystemDeviceDto: CreateSystemDeviceDto) {
    return this.systemDeviceService.create(createSystemDeviceDto);
  }

  @Get()
  findAll() {
    return this.systemDeviceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.systemDeviceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSystemDeviceDto: UpdateSystemDeviceDto) {
    return this.systemDeviceService.update(+id, updateSystemDeviceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.systemDeviceService.remove(+id);
  }
}
