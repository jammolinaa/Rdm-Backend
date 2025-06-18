import { Module } from '@nestjs/common';
import { LastValueService } from './last_value.service';
import { LastValueController } from './last_value.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LastValue } from 'src/data/entities/last_value/last_value.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LastValue])],
  controllers: [LastValueController],
  providers: [LastValueService],
})
export class LastValueModule {}
