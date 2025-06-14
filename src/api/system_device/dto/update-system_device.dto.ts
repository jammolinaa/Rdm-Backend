import { IsOptional, IsNumber, IsObject } from 'class-validator';

export class UpdateSystemDeviceDto {
  @IsOptional()
  @IsNumber()
  class_device_id?: number;

  @IsOptional()
  @IsNumber()
  type_id?: number;

  @IsOptional()
  @IsNumber()
  system_id?: number;

  @IsOptional()
  @IsObject()
  propierty?: Record<string, any>;
}
