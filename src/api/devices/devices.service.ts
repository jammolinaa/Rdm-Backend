import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from 'src/data/entities/devices/device.entity';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
  ) {}

async create(dto: CreateDeviceDto): Promise<Device> {
  const device = this.deviceRepository.create({
    name: dto.name,
    source: { sources_id: dto.sources_id },  // Relación con Source
    systemDevice: { system_device_id: dto.system_device_id }, // 🔧 Esto es lo clave
    is_active: dto.is_active ?? true,
    communication_route: dto.communication_route,
    event: dto.event,
    user_id: dto.user_id,
  });
  return await this.deviceRepository.save(device);
}



  async findAll(): Promise<Device[]> {
    return this.deviceRepository.find();
  }

  async findOne(id: number): Promise<Device> {
    const device = await this.deviceRepository.findOneBy({ device_id: id });
    if (!device) throw new NotFoundException(`Device con ID ${id} no encontrado`);
    return device;
  }

  async update(id: number, dto: UpdateDeviceDto): Promise<Device> {
  const device = await this.deviceRepository.preload({
    device_id: id,
    ...dto,
  });

  if (!device) {
    throw new NotFoundException(`Device con ID ${id} no encontrado`);
  }

  return await this.deviceRepository.save(device);
}


  async remove(id: number): Promise<{ message: string }> {
    const result = await this.deviceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Device con ID ${id} no encontrado`);
    }
    return { message: `Device con ID ${id} eliminado` };
  }
}
