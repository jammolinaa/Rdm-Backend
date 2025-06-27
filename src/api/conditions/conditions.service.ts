import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConditionDto } from './dto/create-condition.dto';
import { UpdateConditionDto } from './dto/update-condition.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Condition } from 'src/data/entities/conditions/condition.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/data/base/baseService/base-service.service';

@Injectable()
export class ConditionsService extends BaseService<
  Condition,
  CreateConditionDto,
  UpdateConditionDto
> {
  constructor(
    @InjectRepository(Condition)
    private readonly conditionRepository: Repository<Condition>,
  ) {
    super(conditionRepository, 'Conditions');
  }
  override async create(dto: CreateConditionDto): Promise<Condition> {
    const condition = this.conditionRepository.create(dto);
    return await this.conditionRepository.save(condition);
  }

  override async update(id: number, dto: UpdateConditionDto): Promise<{
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
  
  return {
    item: updated as Condition & UpdateConditionDto,
    updatedData: {},
  };
}

}

