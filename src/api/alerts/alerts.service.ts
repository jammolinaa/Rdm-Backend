import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alert } from 'src/data/entities/alerts/alert.entity';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(Alert)
    private readonly alertRepository: Repository<Alert>,
  ) {}

  async create(dto: CreateAlertDto): Promise<Alert> {
    const alert = this.alertRepository.create({
      ...dto,
      condition: { condition_id: dto.condition_id },
      device: { device_id: dto.device_id },
    });

    const saved = await this.alertRepository.save(alert);

    const fullAlert = await this.alertRepository.findOne({
      where: { alerts_id: saved.alerts_id },
      relations: ['condition', 'device'],
    });

    if (!fullAlert) {
      throw new NotFoundException(`No se encontró la alerta recién creada`);
    }

    return fullAlert;
  }

  async findAll(): Promise<Alert[]> {
    return this.alertRepository.find({
      relations: ['condition', 'device'],
    });
  }

  async findOne(id: number): Promise<Alert> {
    const alert = await this.alertRepository.findOne({
      where: { alerts_id: id },
      relations: ['condition', 'device'],
    });

    if (!alert) {
      throw new NotFoundException(`Alerta con ID ${id} no encontrada`);
    }

    return alert;
  }

  async update(id: number, dto: UpdateAlertDto): Promise<Alert> {
    const alert = await this.alertRepository.preload({
      alerts_id: id,
      ...dto,
      condition: dto.condition_id
        ? { condition_id: dto.condition_id }
        : undefined,
      device: dto.device_id ? { device_id: dto.device_id } : undefined,
    });

    if (!alert) {
      throw new NotFoundException(`Alerta con ID ${id} no encontrada`);
    }

    return this.alertRepository.save(alert);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.alertRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Alerta con ID ${id} no encontrada`);
    }
    return { message: `Alerta con ID ${id} eliminada correctamente` };
  }
}
