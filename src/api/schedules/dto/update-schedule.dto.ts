import { IsOptional, IsNumber } from 'class-validator';

export class UpdateScheduleDto {
  @IsOptional()
  @IsNumber()
  device_id?: number;
}
