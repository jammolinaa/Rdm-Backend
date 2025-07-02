import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemDevice } from 'src/data/entities/system_device/system_device.entity';
import { CreateSystemDeviceDto } from './dto/create-system_device.dto';
import { UpdateSystemDeviceDto } from './dto/update-system_device.dto';
import { BaseService } from 'src/data/base/baseService/base-service.service';
import { ClassDevice } from 'src/data/entities/class_device/class_device.entity';
import { Type } from 'src/data/entities/type/type.entity';
import { System } from 'src/data/entities/system/system.entity';

@Injectable()
export class SystemDeviceService extends BaseService<SystemDevice, CreateSystemDeviceDto, UpdateSystemDeviceDto> {
  constructor(
    @InjectRepository(SystemDevice)
    private readonly systemDeviceRepository: Repository<SystemDevice>,
  ) {
    super(systemDeviceRepository, 'Systemdevice', ['class_device', 'type', 'system']);
  }
  override async create(dto: CreateSystemDeviceDto): Promise<SystemDevice> {
    const systemDevice = this.systemDeviceRepository.create({
      class_device: { class_device_id: dto.class_device_id } as ClassDevice,
      type: { type_id: dto.type_id } as Type,
      system: { system_id: dto.system_id } as System,
      propierty: dto.propierty,
    });

    return await this.systemDeviceRepository.save(systemDevice);
  }

  override async update(id: number, dto: UpdateSystemDeviceDto) {
    const systemDevice = await this.systemDeviceRepository.findOne({
      where: { system_device_id: id },
    });

    if (!systemDevice) {
      throw new HttpException(...this.verbose.notFound());
    }

    const { class_device_id, type_id, system_id, ...rest } = dto; // Extraemos los campos que son solo para relaciones

    if (class_device_id) {
      // Actualizamos las relaciones si vienen en el DTO
      systemDevice.class_device = this.systemDeviceRepository.manager.create(ClassDevice, {
        class_device_id,
      });
    }

    if (type_id) {
      systemDevice.type = this.systemDeviceRepository.manager.create(Type, {
        type_id,
      });
    }

    if (system_id) {
      systemDevice.system = this.systemDeviceRepository.manager.create(System, {
        system_id,
      });
    }

    Object.assign(systemDevice, rest);

    const item = await this.systemDeviceRepository.save(systemDevice);

    return {
      item,
      updatedData: {},
    };
  }
}
