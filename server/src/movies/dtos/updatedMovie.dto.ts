import { PartialType } from "@nestjs/mapped-types";
import { CreateMovieDto } from "./createMovie.dto";

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}