import { ApiProperty } from "@nestjs/swagger";
import {
	IsDate,
	IsMongoId,
	IsNotEmpty,
	IsNumber,
	IsPositive
} from "class-validator";
import { IsTimeString } from "src/common/utils/validateTimeFormat";

export class CreateShowtimeDto {
	@ApiProperty({ description: "Movie ID", example: "60d21b4667d0d8992e610c85" })
	@IsMongoId()
	@IsNotEmpty()
	movie: string;

	@ApiProperty({
		description: "Theater ID",
		example: "60d21b4967d0d8992e610c86",
	})
	@IsMongoId()
	@IsNotEmpty()
	theater: string;

	@ApiProperty({
		description: "Showtime start time (ISO8601)",
		example: "2024-06-01T19:30:00Z",
	})
	@IsNotEmpty()
	@IsTimeString({ message: "startTime must be in HH:mm 24-hour format" })
	startTime: string;

	@ApiProperty({
		description: "Showtime date",
		example: "2024-06-01T00:00:00.000Z",
		type: Date,
	})
	@IsNotEmpty()
	@IsDate()
	date: Date;

	@ApiProperty({ description: "Ticket price", example: 12.5 })
	@IsNotEmpty()
	@IsNumber()
	@IsPositive()
	price: number;
}
