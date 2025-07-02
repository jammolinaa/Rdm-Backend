import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateAlertDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  device_id: number;

  @IsNumber()
  condition_id: number;

  @IsNumber()
  value: number;

  @IsString()
  unit_time: string;

  @IsString()
  time: string;

  @IsNumber()
  count: number;

  @IsString()
  days: string;

  @IsString()
  hour_start: string;

  @IsString()
  hour_finish: string;

  @IsBoolean()
  @IsOptional()
  state?: boolean;
}
