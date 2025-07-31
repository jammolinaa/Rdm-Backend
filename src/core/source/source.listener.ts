import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ISource } from './source.interface';

@Injectable()
export class SourceListener {
  @OnEvent('source.change')
  handleSourceChangeEvent(payload: { event: string; data: ISource }) {
    console.log(`📢 Evento recibido: ${payload.event}`);
    console.log(' Datos:', payload.data);
  }

  @OnEvent('source.event')
  handleEvent(payload: unknown) {
    console.log('📥 Evento recibido en SourceListener:', payload);
  }
}
