import { IsNumber, IsString } from "class-validator";

export class CreateLastValueDto {

@IsNumber()
device_id: number;

@IsString()
system_variable: string;
    
@IsNumber()
value: number;

}
