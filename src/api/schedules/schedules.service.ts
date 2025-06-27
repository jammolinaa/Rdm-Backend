import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from 'src/data/entities/schedules/schedule.entity';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { BaseService } from 'src/data/base/baseService/base-service.service';
import { Device } from 'src/data/entities/devices/device.entity';
@Injectable()
export class SchedulesService extends BaseService<
  Schedule,
  CreateScheduleDto,
  UpdateScheduleDto
> {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {
    super(scheduleRepository, 'Schedule', ['device'])
  }
  override async create(dto: CreateScheduleDto): Promise<Schedule> {
    const schedule = this.scheduleRepository.create({
      ...dto,
      device: { device_id: dto.device_id } as Device,
    });

    return await this.scheduleRepository.save(schedule);
  }


  override async update(id: number, dto: UpdateScheduleDto): Promise<
    {
      item: Schedule & UpdateScheduleDto;
      updatedData: Record<string, boolean>;
    }> {
    const schedule = await this.scheduleRepository.preload({
      schedules_id: id,
      ...dto,
       device: dto.device_id ? ({ device_id: dto.device_id } as Device) : undefined,
    });

    if (!schedule) {
      throw new NotFoundException(`Schedule con ID ${id} no encontrado`);
    }

    const updated = await this.scheduleRepository.save(schedule);
    return {
      item: updated as Schedule & UpdateScheduleDto,
      updatedData: {},
    };
  }
}
