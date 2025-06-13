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
    private alertRepository: Repository<Alert>,
  ) {}

  async create(dto: CreateAlertDto): Promise<Alert> {
    const alert = this.alertRepository.create(dto);
    return await this.alertRepository.save(alert);
  }

  async findAll(): Promise<Alert[]> {
    return await this.alertRepository.find();
  }

  async findOne(id: number): Promise<Alert> {
    const alert = await this.alertRepository.findOneBy({ alerts_id: id });
    if (!alert) {
      throw new NotFoundException(`Alerta con ID ${id} no encontrada`);
    }
    return alert;
  }

  async update(id: number, dto: UpdateAlertDto): Promise<Alert> {
    await this.alertRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.alertRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Alerta con ID ${id} no encontrada`);
    }
    return { message: `Alerta con ID ${id} eliminada correctamente` };
  }
}
