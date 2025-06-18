import { IsNotEmpty, IsNumber, IsOptional, IsString, IsObject, IsBoolean } from 'class-validator';

export class CreateScheduleDto {
  
  @IsNumber()
  device_id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsObject()
  days: Record<string, any>;

  @IsObject()
  value: Record<string, any>;

  @IsBoolean()
  state: boolean;
}
