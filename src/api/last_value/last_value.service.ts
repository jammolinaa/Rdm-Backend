import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LastValue } from 'src/data/entities/last_value/last_value.entity';
import { BaseService } from 'src/data/base/baseService/base-service.service';
import { CreateLastValueDto } from './dto/create-last_value.dto';
import { UpdateLastValueDto } from './dto/update-last_value.dto';
// import { ICreateLastValue } from 'src/data/interface/api/lastValue/last-value.interface';

@Injectable()
export class LastValueService extends BaseService<LastValue, CreateLastValueDto, UpdateLastValueDto> {
  constructor(
    @InjectRepository(LastValue)
    private readonly lastValueRepository: Repository<LastValue>,
  ) {
    super(lastValueRepository, 'LastValue', ['device']);
  }

  override async create({ device_id, ...lastValueData }: CreateLastValueDto): Promise<LastValue> {
    return this.lastValueRepository.save({
      ...lastValueData,
      device: { device_id: device_id },
    });
  }

  override async update(id: number, dto: UpdateLastValueDto) {
    const entity = await this.lastValueRepository.findOne({
      where: { last_value_id: id },
      relations: ['device'],
    });

    if (!entity) throw new HttpException(...this.verbose.notFound());

    if (dto.device_id) {
      entity.device = { device_id: dto.device_id } as any;
    }

    Object.assign(entity, dto);
    return {
      item: await this.lastValueRepository.save(entity),
      updatedData: {},
    };
  }
}
