import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Source } from 'src/data/entities/sources/source.entity';
import { Repository, Sort } from 'typeorm';

@Injectable()
export class SourcesService {
  constructor(
    @InjectRepository(Source)
    private readonly sourceRepository: Repository<Source>,
  ) {}

async create(dto: CreateSourceDto): Promise<Source> {
    const schedule = this.sourceRepository.create({
      ...dto,
      type_id: { type_id: dto.type_id },
    });
    return await this.sourceRepository.save(schedule);
}

  async findAll(): Promise<Source[]> {
      return this.sourceRepository.find();
  }

  async findOne(id: number): Promise<Source> {
      const source = await this.sourceRepository.findOneBy({ sources_id: id });
      if (!source) {
        throw new NotFoundException(`Source con ID ${id} no encontrado`);
      }
      return source;
    }

  async update(id: number, dto: UpdateSourceDto): Promise<Source> {
    const schedule = this.sourceRepository.create({
        ...dto,
        type_id: { type_id: dto.type_id },
    });
      await this.sourceRepository.update(id, schedule);
      return this.findOne(id);
    }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.sourceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Schedule con ID ${id} no encontrado`);
    }
    return { message: `Schedule con ID ${id} eliminado` };
  }
}
