import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from 'src/data/entities/devices/device.entity';
import { Source } from 'src/data/entities/sources/source.entity';
import { SystemDevice } from 'src/data/entities/system_device/system_device.entity';
import { Repository } from 'typeorm';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { BaseService } from 'src/data/base/baseService/base-service.service';

@Injectable()
export class DevicesService extends BaseService<Device, CreateDeviceDto, UpdateDeviceDto> {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
  ) {
    super(deviceRepository, 'Device', ['source', 'systemDevice']);
  }

  override async create(dto: CreateDeviceDto): Promise<Device> {
    const device = this.deviceRepository.create({
      name: dto.name,
      is_active: dto.is_active ?? true,
      communication_route: dto.communication_route,
      event: dto.event,
      user_id: dto.user_id,
      source: { sources_id: dto.sources_id } as Source,
      systemDevice: { system_device_id: dto.system_device_id } as SystemDevice,
    });

    return await this.deviceRepository.save(device);
  }

  override async update(id: number, dto: UpdateDeviceDto) {
    const device = await this.deviceRepository.findOne({
      where: { device_id: id },
    });

    if (!device) {
      throw new HttpException(...this.verbose.notFound());
    }

    if (dto.sources_id) {
      device.source = this.deviceRepository.manager.create(Source, {
        sources_id: dto.sources_id,
      });
    }

    if (dto.system_device_id) {
      device.systemDevice = this.deviceRepository.manager.create(SystemDevice, {
        system_device_id: dto.system_device_id,
      });
    }

    Object.assign(device, dto);

    return {
      item: await this.deviceRepository.save(device),
      updatedData: {},
    };
  }
}
