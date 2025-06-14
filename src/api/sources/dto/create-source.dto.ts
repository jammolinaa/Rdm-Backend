import { IsNumber } from "class-validator";

export class CreateSourceDto {

    @IsNumber()
    sources_id: number;

    @IsNumber()
    type_id: number;

}
