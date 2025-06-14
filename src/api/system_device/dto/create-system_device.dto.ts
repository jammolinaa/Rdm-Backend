import { IsNotEmpty, IsNumber, IsObject } from 'class-validator';

export class CreateSystemDeviceDto {
  @IsNotEmpty()
  @IsNumber()
  class_device_id: number;

  @IsNotEmpty()
  @IsNumber()
  type_id: number;

  @IsNotEmpty()
  @IsNumber()
  system_id: number;

  @IsObject()
  propierty: Record<string, any>;
}
