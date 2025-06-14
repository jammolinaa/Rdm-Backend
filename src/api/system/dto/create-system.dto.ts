import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSystemDto {
    
    @IsString()
    @IsNotEmpty()
    name: string;

}
