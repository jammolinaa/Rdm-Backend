import { IsNotEmpty, IsString } from 'class-validator';
export class CreateClassDeviceDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
