import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
	ArrayMinSize,
	IsArray,
	IsNotEmpty,
	IsNumber,
	IsPositive,
	ValidateNested
} from "class-validator";
import { CreateSeatDto } from "src/seats/dtos/createSeat.dto";

export class CreateTheaterDto {
	@ApiProperty({
		description: "The theater number",
		example: 1,
	})
	@IsNumber()
	@IsPositive()
	@IsNotEmpty()
	number: number;

	@ApiProperty({
		description: "The total capacity of the theater",
		example: 200,
	})
	@IsNumber()
	@IsPositive()
	@IsNotEmpty()
	capacity: number;

	@ApiProperty({
		description: "2D array representing the seat layout of the theater",
		example: [
			["A1", "A2", "A3"],
			["B1", "B2", "B3"],
		],
		type: [String],
		isArray: true,
	})
	@IsArray()
	@ArrayMinSize(1)
	@IsArray({ each: true })
	seat_map: string[][];

	@ApiProperty({
		description: "Array of seat IDs",
		example: ["seat1", "seat2", "seat3"],
		type: [String],
	})
	@IsArray()
	@ArrayMinSize(1)
	@ValidateNested({ each: true })
	@Type(() => CreateSeatDto)
	seats: CreateSeatDto[];
}
