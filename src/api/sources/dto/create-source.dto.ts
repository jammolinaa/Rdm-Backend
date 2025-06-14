import { IsNumber } from "class-validator";

export class CreateSourceDto {

    @IsNumber()
    type_id: number;

}
