import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Source } from 'src/data/entities/sources/source.entity';
import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';
import { BaseService } from 'src/data/base/baseService/base-service.service';
import { ICreateSource } from 'src/data/interface/api/source/source.interface'; 

@Injectable()
export class SourcesService extends BaseService<
  Source,
  CreateSourceDto,
  UpdateSourceDto
> {
  constructor(
    @InjectRepository(Source)
    private readonly sourceRepository: Repository<Source>,
  ) {
    super(sourceRepository, 'Source', ['type']);
  }

  override async create({ type_id, ...sourceData }: ICreateSource): Promise<Source> {
    return this.sourceRepository.save({
      ...sourceData,
      type: { type_id },
    });
  }

  override async update(id: number, dto: UpdateSourceDto) {
    const entity = await this.sourceRepository.findOne({
      where: { sources_id: id },
      relations: ['type'],
    });

    if (!entity) throw new HttpException(...this.verbose.notFound());

    if (dto.type_id) {
      entity.type = { type_id: dto.type_id } as any;
    }

    Object.assign(entity, dto);

    return {
      item: await this.sourceRepository.save(entity),
      updatedData: {},
    };
  }
}
