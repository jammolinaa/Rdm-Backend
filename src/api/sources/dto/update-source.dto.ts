import { IsOptional, IsNumber } from 'class-validator';

export class UpdateSourceDto {
  @IsOptional()
  @IsNumber()
  type_id?: number;


}