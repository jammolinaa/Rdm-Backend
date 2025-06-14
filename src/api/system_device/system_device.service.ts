import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemDevice } from 'src/data/entities/system_device/system_device.entity';
import { CreateSystemDeviceDto } from './dto/create-system_device.dto';
import { UpdateSystemDeviceDto } from './dto/update-system_device.dto';

@Injectable()
export class SystemDeviceService {
  constructor(
    @InjectRepository(SystemDevice)
    private readonly systemDeviceRepository: Repository<SystemDevice>,
  ) {}

  async create(dto: CreateSystemDeviceDto): Promise<SystemDevice> {
    const systemDevice = this.systemDeviceRepository.create({
      class_device: { class_device_id: dto.class_device_id },
      type: { type_id: dto.type_id },
      system: { system_id: dto.system_id },
      propierty: dto.propierty,
    });

    return await this.systemDeviceRepository.save(systemDevice);
  }

  async findAll(): Promise<SystemDevice[]> {
    return this.systemDeviceRepository.find();
  }

  async findOne(id: number): Promise<SystemDevice> {
    const item = await this.systemDeviceRepository.findOneBy({ system_device_id: id });
    if (!item) throw new NotFoundException(`SystemDevice con ID ${id} no encontrado`);
    return item;
  }

  async update(id: number, dto: UpdateSystemDeviceDto): Promise<SystemDevice> {
    const existing = await this.findOne(id);

    const updated = {
      ...existing,
      ...(dto.class_device_id && { class_device: { class_device_id: dto.class_device_id } }),
      ...(dto.type_id && { type: { type_id: dto.type_id } }),
      ...(dto.system_id && { system: { system_id: dto.system_id } }),
      ...(dto.propierty && { propierty: dto.propierty }),
    };

    await this.systemDeviceRepository.save(updated);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.systemDeviceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`SystemDevice con ID ${id} no encontrado`);
    }
    return { message: `SystemDevice con ID ${id} eliminado` };
  }
}
