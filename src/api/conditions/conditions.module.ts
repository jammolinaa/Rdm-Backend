import { Module } from '@nestjs/common';
import { ConditionsService } from './conditions.service';
import { ConditionsController } from './conditions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Condition } from 'src/data/entities/conditions/condition.entity';
import { ConditionListener } from 'src/core/conditions/conditions.listener';

@Module({
  imports: [TypeOrmModule.forFeature([Condition])],
  controllers: [ConditionsController],
  providers: [ConditionsService, ConditionListener],
})
export class ConditionsModule {}
