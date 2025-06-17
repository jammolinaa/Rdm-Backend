import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Alert } from "src/data/entities/alerts/alert.entity";
import { OneToMany } from "typeorm";

export class CreateConditionDto {
    
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    description: string;

}
