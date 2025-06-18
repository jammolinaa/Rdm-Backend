import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLastValueDto } from './dto/create-last_value.dto';
import { UpdateLastValueDto } from './dto/update-last_value.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LastValue } from 'src/data/entities/last_value/last_value.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LastValueService {
  constructor(
    @InjectRepository(LastValue)
    private readonly lastvalueRepository: Repository<LastValue>,
  ){}

  async create(createLastValueDto: CreateLastValueDto): Promise<LastValue> {
    const lastValue = this.lastvalueRepository.create({
      ...createLastValueDto,
    device: {device_id: createLastValueDto.device_id},
    });

    return await this.lastvalueRepository.save(lastValue);
  }

  async findAll(): Promise <LastValue[]>{
    return this.lastvalueRepository.find({
      relations: ['device'],
    });
  }

  async findOne(id: number): Promise<LastValue> {
    const lastValue = await this.lastvalueRepository.findOne({
      where: {last_value_id: id},
      relations: ['device']
    });
    if (!lastValue){
      throw new NotFoundException(`LastValue con ID ${id} no encontrado`);
    }
    return lastValue;
  }

  async update(id: number, updateLastValueDto: UpdateLastValueDto): Promise<LastValue>  {
    const lastValue = await this.lastvalueRepository.preload({
    last_value_id: id,
    ...updateLastValueDto,
    device: updateLastValueDto.device_id ? { device_id: updateLastValueDto.device_id } : undefined,
  });

  if (!lastValue) {
    throw new NotFoundException(`Schedule con ID ${id} no encontrado`);
  }

  return this.lastvalueRepository.save(lastValue);
}

  async remove(id: number): Promise<{ message: string}> {
    const result = await this.lastvalueRepository.delete(id);
    if (result.affected === 0){
      throw new NotFoundException(`LastValue con ID ${id} no encontrado`);
    }
    return {message: `This action removes a #${id} lastValue`};
  }
}
