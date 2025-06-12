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
    const device = this.deviceRepository.create(dto);
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
    await this.deviceRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.deviceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Device con ID ${id} no encontrado`);
    }
    return { message: `Device con ID ${id} eliminado` };
  }
}
