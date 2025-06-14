import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassDevice } from 'src/data/entities/class_device/class_device.entity';
import { CreateClassDeviceDto } from './dto/create-class_device.dto';
import { UpdateClassDeviceDto } from './dto/update-class_device.dto';

@Injectable()
export class ClassDeviceService {
  constructor(
    @InjectRepository(ClassDevice)
    private readonly classDeviceRepository: Repository<ClassDevice>,
  ) {}

  async create(dto: CreateClassDeviceDto): Promise<ClassDevice> {
    const classDevice = this.classDeviceRepository.create(dto);
    return await this.classDeviceRepository.save(classDevice);
  }

  async findAll(): Promise<ClassDevice[]> {
    return this.classDeviceRepository.find();
  }

  async findOne(id: number): Promise<ClassDevice> {
    const classDevice = await this.classDeviceRepository.findOneBy({ class_device_id: id });
    if (!classDevice) {
      throw new NotFoundException(`ClassDevice con ID ${id} no encontrado`);
    }
    return classDevice;
  }

  async update(id: number, dto: UpdateClassDeviceDto): Promise<ClassDevice> {
    await this.classDeviceRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.classDeviceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`ClassDevice con ID ${id} no encontrado`);
    }
    return { message: `ClassDevice con ID ${id} eliminado` };
  }
}
