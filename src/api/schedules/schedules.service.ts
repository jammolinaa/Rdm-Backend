import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from 'src/data/entities/schedules/schedule.entity';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async create(dto: CreateScheduleDto): Promise<Schedule> {
      const schedule = this.scheduleRepository.create({
        ...dto,
        device: { device_id: dto.device_id },
    });

  return await this.scheduleRepository.save(schedule);
}

  async findAll(): Promise<Schedule[]> {
    return this.scheduleRepository.find();
  }

  async findOne(id: number): Promise<Schedule> {
    const schedule = await this.scheduleRepository.findOneBy({ schedules_id: id });
    if (!schedule) {
      throw new NotFoundException(`Schedule con ID ${id} no encontrado`);
    }
    return schedule;
  }

  async update(id: number, dto: UpdateScheduleDto): Promise<Schedule> {
  const schedule = await this.scheduleRepository.preload({
    schedules_id: id,
    ...dto,
    device: dto.device_id ? { device_id: dto.device_id } : undefined,
  });

  if (!schedule) {
    throw new NotFoundException(`Schedule con ID ${id} no encontrado`);
  }

  return this.scheduleRepository.save(schedule);
}



  async remove(id: number): Promise<{ message: string }> {
    const result = await this.scheduleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Schedule con ID ${id} no encontrado`);
    }
    return { message: `Schedule con ID ${id} eliminado` };
  }
}
