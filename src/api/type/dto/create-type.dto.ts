import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateTypeDto {

    @IsNumber()
    type_id: number;
    
    @IsString()
    @IsNotEmpty()
    name: string;
}
