import { Injectable, OnModuleInit } from '@nestjs/common';
import { filter } from 'rxjs';
import { RdmEventsService, RdmEventType } from '../event/rdm-events.service';

@Injectable()
export class ConditionListener implements OnModuleInit {
  constructor(private readonly eventsService: RdmEventsService) {}

  onModuleInit() {
    this.eventsService.events$.pipe(filter((event) => event.entity === 'Condition')).subscribe((event) => {
      switch (event.type) {
        case RdmEventType.CREATED:
          console.log('🟢 Condition creada:', event.data);
          break;
        case RdmEventType.UPDATED:
          console.log('🟡 Condition actualizada:', event.data);
          break;
        case RdmEventType.DELETED:
          console.log('🔴 Condition eliminada:', event.data);
          break;
      }
    });
  }
}
