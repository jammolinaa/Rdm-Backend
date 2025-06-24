import { IsOptional, IsBoolean, IsNumber, IsString } from 'class-validator';

export class UpdateDeviceDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  sources_id?: number;

  @IsOptional()
  @IsNumber()
  system_device_id?: number;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  communication_route?: Record<string, any>;

  @IsOptional()
  event?: Record<string, any>;

  @IsOptional()
  @IsNumber()
  user_id?: number;
}
