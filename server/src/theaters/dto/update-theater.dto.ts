import { PartialType } from "@nestjs/mapped-types";
import { CreateTheaterDto } from "./create-theater.dto";
import { IsMongoId, IsNotEmpty } from "class-validator";

export class UpdateTheaterDto extends PartialType(CreateTheaterDto) {
    @IsNotEmpty()
    @IsMongoId()
    theaterId: string
}
