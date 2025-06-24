import { IsNotEmpty, IsString } from 'class-validator';
export class CreateConditionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
