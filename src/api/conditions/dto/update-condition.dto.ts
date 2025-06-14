import { PartialType } from '@nestjs/mapped-types';
import { CreateConditionDto } from './create-condition.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateConditionDto extends PartialType(CreateConditionDto) {
    
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}
