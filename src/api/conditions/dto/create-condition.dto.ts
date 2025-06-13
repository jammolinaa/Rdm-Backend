import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateConditionDto {
    
    @IsNumber()
    condition_id: number;
        
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    description: string;

}
