import {
	IsString,
	IsNumber,
	IsArray,
	IsNotEmpty,
	ArrayMinSize,
	ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { CreateSeatDto } from "src/seats/dtos/createSeat.dto";

export class CreateTheaterDto {
	@ApiProperty({
		description: "The name of the theater",
		example: "Cineplex Downtown",
	})
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty({
		description: "The location of the theater",
		example: "123 Main Street, City",
	})
	@IsString()
	@IsNotEmpty()
	location: string;

	@ApiProperty({
		description: "The total capacity of the theater",
		example: 200,
	})
	@IsNumber()
	@IsNotEmpty()
	capacity: number;

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
}
