import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConditionDto } from './dto/create-condition.dto';
import { UpdateConditionDto } from './dto/update-condition.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Condition } from 'src/data/entities/conditions/condition.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConditionsService {
  constructor(
    @InjectRepository(Condition)
    private conditionRepository: Repository<Condition>,
  ) {}
  async create(dto: CreateConditionDto): Promise<Condition> {
    const condition = this.conditionRepository.create(dto);
    return await this.conditionRepository.save(condition);
  }

  async findAll(): Promise<Condition[]> {
    return this.conditionRepository.find();
  }

  async findOne(id: number): Promise<Condition> {
    const condition = await this.conditionRepository.findOneBy({
      condition_id: id,
    });
    if (!condition)
      throw new NotFoundException(`Condition con ID ${id} no encontrado`);
    return condition;
  }

  async update(id: number, dto: UpdateConditionDto): Promise<Condition> {
    const condition = await this.conditionRepository.preload({
      condition_id: id,
      ...dto,
    });

    if (!condition) {
      throw new NotFoundException(`Condition con ID ${id} no encontrado`);
    }

    return this.conditionRepository.save(condition);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.conditionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`condition con ID ${id} no encontrado`);
    }
    return { message: `Device con ID ${id} eliminado` };
  }
}
