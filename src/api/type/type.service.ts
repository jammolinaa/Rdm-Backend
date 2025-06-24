import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Type } from 'src/data/entities/type/type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(Type)
    private readonly TypeRepository: Repository<Type>,
  ) {}

  async create(createTypeDto: CreateTypeDto): Promise<Type> {
    const Type = this.TypeRepository.create(createTypeDto);
    return await this.TypeRepository.save(Type);
  }

  async findAll(): Promise<Type[]> {
    return this.TypeRepository.find();
  }

  async findOne(id: number): Promise<Type> {
    const Type = await this.TypeRepository.findOneBy({ type_id: id });
    if (!Type) throw new NotFoundException(`Device con ID ${id} no encontrado`);
    return Type;
  }

  async update(id: number, createTypeDto: UpdateTypeDto): Promise<Type> {
    await this.TypeRepository.update(id, createTypeDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    const type = await this.TypeRepository.findOne({ where: { type_id: id } });
    if (!type) {
      throw new NotFoundException(`Type con ID ${id} no encontrado`);
    }

    await this.TypeRepository.remove(type);
    return { message: `Type con ID ${id} eliminado` };
  }
}
