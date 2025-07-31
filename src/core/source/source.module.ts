import { Module } from '@nestjs/common';
import { SourceService } from './source.service';
import { SourceController } from './source.controller';
import { SourceListener } from './source.listener';

@Module({
  controllers: [SourceController],
  providers: [SourceService, SourceListener],
  exports: [SourceService, SourceListener],
})
export class SourceModule {}
