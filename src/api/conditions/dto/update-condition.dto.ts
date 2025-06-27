import { PartialType } from '@nestjs/mapped-types';
import { CreateConditionDto } from './create-condition.dto';
import { IsOptional } from 'class-validator';
export class UpdateConditionDto extends PartialType(CreateConditionDto) {
  @IsOptional()
  name: string;
}
