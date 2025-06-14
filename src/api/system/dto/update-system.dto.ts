import { IsOptional, IsString } from 'class-validator';

export class UpdateSystemDto {
  @IsOptional()
  @IsString()
  name?: string;
}