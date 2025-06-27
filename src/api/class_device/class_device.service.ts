import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassDevice } from 'src/data/entities/class_device/class_device.entity';
import { CreateClassDeviceDto } from './dto/create-class_device.dto';
import { UpdateClassDeviceDto } from './dto/update-class_device.dto';
import { BaseService } from 'src/data/base/baseService/base-service.service';

@Injectable()
export class ClassDeviceService extends BaseService<
  ClassDevice,
  CreateClassDeviceDto,
  UpdateClassDeviceDto
> {
  constructor(
    @InjectRepository(ClassDevice)
    private readonly classDeviceRepository: Repository<ClassDevice>,
  ) {
    super(classDeviceRepository, 'Classdevice');
  }
  override async create(dto: CreateClassDeviceDto): Promise<ClassDevice> {
    const classDevice = this.classDeviceRepository.create(dto);
    return await this.classDeviceRepository.save(classDevice);
  }

  override async update(id: number, dto: UpdateClassDeviceDto): Promise<
    {
      item: ClassDevice & UpdateClassDeviceDto;
      updatedData: Record<string, boolean>;
    }> {
    const classDevice = await this.classDeviceRepository.preload({
      class_device_id: id,
      ...dto,
    })

    if (!classDevice) {
      throw new NotFoundException(`ClassDevice con ID ${id} no encontrado`);
    }

    const updated = await this.classDeviceRepository.save(classDevice);
    return {
      item: updated as ClassDevice & UpdateClassDeviceDto,
      updatedData: {},
    };
  }
}
