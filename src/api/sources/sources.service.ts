import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Source } from 'src/data/entities/sources/source.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SourcesService {
  constructor(
    @InjectRepository(Source)
    private readonly sourceRepository: Repository<Source>,
  ) {}

  async create(dto: CreateSourceDto): Promise<Source> {
    const source = this.sourceRepository.create({
      ...dto,
      type: { type_id: dto.type_id },
    });
    return await this.sourceRepository.save(source);
  }

  async findAll(): Promise<Source[]> {
    return this.sourceRepository.find({
      relations: ['type'],
    });
  }

  async findOne(id: number): Promise<Source> {
    const source = await this.sourceRepository.findOne({
      where: { sources_id: id },
      relations: ['type'],
    });
    if (!source) {
      throw new NotFoundException(`Source con ID ${id} no encontrado`);
    }
    return source;
  }

  async update(id: number, dto: UpdateSourceDto): Promise<Source> {
    const source = await this.sourceRepository.preload({
      sources_id: id,
      ...dto,
      type: dto.type_id ? { type_id: dto.type_id } : undefined,
    });

    if (!source) {
      throw new NotFoundException(`Source con ID ${id} no encontrado`);
    }

    return this.sourceRepository.save(source);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.sourceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Schedule con ID ${id} no encontrado`);
    }
    return { message: `Schedule con ID ${id} eliminado` };
  }
}
