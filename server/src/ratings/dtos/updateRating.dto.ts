import { PartialType } from "@nestjs/mapped-types";
import { CreateRatingDto } from "./createRating.dto";

export class UpdateRatingDto extends PartialType(CreateRatingDto) {}
