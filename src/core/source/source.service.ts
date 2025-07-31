import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateSourceDto } from './dto/create-source.dto';
import { UpdateSourceDto } from './dto/update-source.dto';
import { ISource } from './source.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class SourceService {
  private sources = new Map<string, ISource>();

  constructor(private eventEmitter: EventEmitter2) {}

  create(source: CreateSourceDto): ISource {
    const newSource: ISource = {
      id: randomUUID(),
      ...source,
    };
    this.sources.set(newSource.id, newSource);
    this.emit('create', newSource);
    return newSource;
  }

  findAll(): ISource[] {
    return Array.from(this.sources.values());
  }

  findOne(id: string): ISource | undefined {
    return this.sources.get(id);
  }

  update(id: string, update: UpdateSourceDto): ISource | undefined {
    const source = this.sources.get(id);
    if (!source) return undefined;
    const updated = { ...source, ...update };
    this.sources.set(id, updated);
    this.emit('update', updated);
    return updated;
  }

  remove(id: string): boolean {
    const source = this.sources.get(id);
    if (!source) return false;
    this.sources.delete(id);
    this.emit('delete', source);
    return true;
  }

  private emit(event: 'create' | 'get' | 'update' | 'delete', data: ISource) {
    this.eventEmitter.emit('source.change', { event, data });
  }
}
