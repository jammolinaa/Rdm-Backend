import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsObject } from 'class-validator';

export class CreateDeviceDto {
  @IsNumber()
  device_id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  sources_id: number;

  @IsNumber()
  system_device_id: number;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsObject()
  communication_route: Record<string, any>;

  @IsObject()
  event: Record<string, any>;

  @IsNumber()
  user_id: number;
}




