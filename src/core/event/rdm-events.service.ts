import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';

export enum RdmEventType {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
}

export interface RdmEvent<T> {
  type: RdmEventType;
  entity: string;
  data: T;
}

@Injectable()
export class RdmEventsService {
  private eventSubject = new Subject<RdmEvent<unknown>>();
  public events$ = this.eventSubject.asObservable();

  constructor(private readonly emitter: EventEmitter2) {}

  emit<T>(event: RdmEvent<T>) {
    this.eventSubject.next(event);
    this.emitter.emit(`${event.entity.toLowerCase()}.${event.type.toLowerCase()}`, {
      event: event.type,
      data: event.data,
    });
  }
}
