import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alert } from 'src/data/entities/alerts/alert.entity';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { BaseService } from 'src/data/base/baseService/base-service.service';
import { Device } from 'src/data/entities/devices/device.entity';
import { Condition } from 'src/data/entities/conditions/condition.entity';

@Injectable()
export class AlertsService extends BaseService<
  Alert,
  CreateAlertDto,
  UpdateAlertDto
> {
  constructor(
    @InjectRepository(Alert)
    private readonly alertRepository: Repository<Alert>,
  ) {
    super(alertRepository, 'Alert', ['condition', 'device']);
  }

  override async create({ 
    condition_id,
    device_id, 
    ...alertData 
  }: CreateAlertDto): Promise<Alert> {
    return this.alertRepository.save({
      ...alertData,
      condition: { condition_id } as Condition,
      device: { device_id } as Device,
    });
  }
  // const saved = await this.alertRepository.save(alert);

  // const fullAlert = await this.alertRepository.findOne({
  //   where: { alerts_id: saved.alerts_id },
  //   relations: ['condition', 'device'],
  // });

  //   if (!fullAlert) {
  //     throw new NotFoundException(`No se encontró la alerta recién creada`);
  //   }

  //   return fullAlert;
  // }

  override async update(id: number, dto: UpdateAlertDto) {
    const entity = await this.alertRepository.findOne({
      where: {alerts_id: id} ,
      relations: ['condition', 'device'],
      // condition: dto.condition_id
      //   ? { condition_id: dto.condition_id }
      //   : undefined,
      // device: dto.device_id ? { device_id: dto.device_id } : undefined,
    });

     if (!entity) throw new HttpException(...this.verbose.notFound());

     if (dto.device_id) {
      entity.device = { device_id: dto.device_id } as any;
    }
    if (dto.condition_id) {
      entity.condition = { condition_id: dto.condition_id } as any;
    }
    Object.assign(entity,dto);

     return {

      item: await this.alertRepository.save(entity),
      updatedData:{},
     };
  }

}
