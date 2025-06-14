import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { System } from 'src/data/entities/system/system.entity';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';

@Injectable()
export class SystemService {
  constructor(
    @InjectRepository(System)
    private readonly systemRepository: Repository<System>,
  ) {}

  async create(createSystemDto: CreateSystemDto): Promise<System> {
    const system = this.systemRepository.create(createSystemDto);
    return await this.systemRepository.save(system);
  }

  async findAll(): Promise<System[]> {
    return this.systemRepository.find();
  }

  async findOne(id: number): Promise<System> {
    const system = await this.systemRepository.findOneBy({ system_id: id });
    if (!system) {
      throw new NotFoundException(`System con ID ${id} no encontrado`);
    }
    return system;
  }

  async update(id: number, updateSystemDto: UpdateSystemDto): Promise<System> {
    await this.systemRepository.update(id, updateSystemDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.systemRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`System con ID ${id} no encontrado`);
    }
    return { message: `System con ID ${id} eliminado` };
  }
}
