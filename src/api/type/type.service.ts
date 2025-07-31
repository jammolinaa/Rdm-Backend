import { HttpException, Injectable } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Type } from 'src/data/entities/type/type.entity';
import { BaseService } from 'src/data/base/baseService/base-service.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class TypeService extends BaseService<Type, CreateTypeDto, UpdateTypeDto> {
  constructor(
    @InjectRepository(Type)
    private readonly TypeRepository: Repository<Type>,
    private readonly eventEmitter: EventEmitter2,
  ) {
    super(TypeRepository, 'Type');
  }

  override async create(dto: CreateTypeDto): Promise<Type> {
    const entity = this.TypeRepository.create(dto);
    const saved = await this.TypeRepository.save(entity);

    this.eventEmitter.emit('source.event', {
      module: 'type',
      payload: saved,
    });

    return saved;
  }

  override async update(id: number, dto: UpdateTypeDto) {
    const entity = await this.TypeRepository.findOne({
      where: { type_id: id },
    });

    if (!entity) throw new HttpException(...this.verbose.notFound());

    Object.assign(entity, dto);

    return {
      item: await this.TypeRepository.save(entity),
      updatedData: {},
    };
  }
}
