import { IsNumber, IsString, Max, Min } from "class-validator";

export class CreateRatingDto {
	@IsNumber()
	@Min(1)
	@Max(10)
	stars: number;

	@IsString()
	comment: string;
}