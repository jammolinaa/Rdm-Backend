import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateSourceDto {

    @IsNumber()
    @IsNotEmpty()
    sources_id: number;

    @IsNotEmpty()
    @IsNumber()
    type_id: number;

}
