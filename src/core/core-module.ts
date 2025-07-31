import { Module, Global } from '@nestjs/common';
import { RdmEventsService } from './event/rdm-events.service';

@Global()
@Module({
  providers: [RdmEventsService],
  exports: [RdmEventsService],
})
export class CoreModule {}
