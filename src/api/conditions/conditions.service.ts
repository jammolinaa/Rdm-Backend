import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'src/data/base/baseService/base-service.service';
import { Condition } from 'src/data/entities/conditions/condition.entity';
import { CreateConditionDto } from './dto/create-condition.dto';
import { UpdateConditionDto } from './dto/update-condition.dto';
import { RdmEventsService, RdmEventType } from 'src/core/event/rdm-events.service';

@Injectable()
export class ConditionsService extends BaseService<Condition, CreateConditionDto, UpdateConditionDto> {
  constructor(
    @InjectRepository(Condition)
    private readonly conditionRepository: Repository<Condition>,

    private readonly eventsService: RdmEventsService,
  ) {
    super(conditionRepository, 'Conditions');
  }

  override async create(dto: CreateConditionDto): Promise<Condition> {
    const condition = this.conditionRepository.create(dto);
    const saved = await this.conditionRepository.save(condition);

    this.eventsService.emit<Condition>({
      type: RdmEventType.CREATED,
      entity: 'Condition',
      data: saved,
    });

    return saved;
  }

  override async update(
    id: number,
    dto: UpdateConditionDto,
  ): Promise<{
    item: Condition & UpdateConditionDto;
    updatedData: Record<string, boolean>;
  }> {
    const condition = await this.conditionRepository.preload({
      condition_id: id,
      ...dto,
    });

    if (!condition) {
      throw new NotFoundException(`Condition con ID ${id} no encontrado`);
    }

    const updated = await this.conditionRepository.save(condition);

    this.eventsService.emit<Condition>({
      type: RdmEventType.UPDATED,
      entity: 'Condition',
      data: updated,
    });

    return {
      item: updated as Condition & UpdateConditionDto,
      updatedData: {},
    };
  }

  // 🔥 Agregamos delete manualmente para emitir evento también
  async delete(id: number): Promise<void> {
    const condition = await this.conditionRepository.findOneBy({
      where: { condition_id: id },
    });

    if (!condition) {
      throw new NotFoundException(`Condition con ID ${id} no encontrado`);
    }

    await this.conditionRepository.delete(id);

    this.eventsService.emit<Condition>({
      type: RdmEventType.DELETED,
      entity: 'Condition',
      data: condition,
    });
  }
}
