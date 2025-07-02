import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeDto } from './create-type.dto';
import { IsNumber, IsOptional } from 'class-validator';
export class UpdateTypeDto extends PartialType(CreateTypeDto) {
  @IsOptional()
  @IsNumber()
  source_id?: number;
}
