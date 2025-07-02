import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { System } from 'src/data/entities/system/system.entity';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';
import { BaseService } from 'src/data/base/baseService/base-service.service';

@Injectable()
export class SystemService extends BaseService<System, CreateSystemDto, UpdateSystemDto> {
  constructor(
    @InjectRepository(System)
    private readonly systemRepository: Repository<System>,
  ) {
    super(systemRepository, 'System');
  }
  override async create(dto: CreateSystemDto): Promise<System> {
    const system = this.systemRepository.create(dto);
    return await this.systemRepository.save(system);
  }

  override async update(
    id: number,
    dto: UpdateSystemDto,
  ): Promise<{
    item: System & UpdateSystemDto;
    updatedData: Record<string, boolean>;
  }> {
    const system = await this.systemRepository.preload({
      system_id: id,
      ...dto,
    });

    if (!system) {
      throw new NotFoundException(`System con ID ${id} no encontrado`);
    }

    const updated = await this.systemRepository.save(system);
    return {
      item: updated as System & UpdateSystemDto,
      updatedData: {},
    };
  }
}
