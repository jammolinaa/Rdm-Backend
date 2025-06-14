import { Injectable } from '@nestjs/common';
import { CreateClassDeviceDto } from './dto/create-class_device.dto';
import { UpdateClassDeviceDto } from './dto/update-class_device.dto';

@Injectable()
export class ClassDeviceService {
  create(createClassDeviceDto: CreateClassDeviceDto) {
    return 'This action adds a new classDevice';
  }

  findAll() {
    return `This action returns all classDevice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} classDevice`;
  }

  update(id: number, updateClassDeviceDto: UpdateClassDeviceDto) {
    return `This action updates a #${id} classDevice`;
  }

  remove(id: number) {
    return `This action removes a #${id} classDevice`;
  }
}
