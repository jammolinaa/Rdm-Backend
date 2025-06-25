import { IsNotEmpty, IsNumber, IsString } from "class-validator";
export class CreateTypeDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    // @IsNumber()
    // source_id: number;
}
