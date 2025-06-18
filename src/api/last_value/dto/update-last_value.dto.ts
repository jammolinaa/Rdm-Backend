import { PartialType } from '@nestjs/mapped-types';
import { CreateLastValueDto } from './create-last_value.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateLastValueDto extends PartialType(CreateLastValueDto) {
  @IsOptional()
  @IsNumber()
  device_id?: number;
    
}
