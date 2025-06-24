import { IsOptional, IsString } from 'class-validator';
export class UpdateClassDeviceDto {
  @IsOptional()
  @IsString()
  name?: string;
}
