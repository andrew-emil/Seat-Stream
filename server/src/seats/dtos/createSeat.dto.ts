import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { SeatType } from "../enums/seatType.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSeatDto {
	@ApiProperty({
		description: "The seat number",
		example: "A1",
	})
	@IsString()
	@IsNotEmpty()
	seat_number: string;

	@ApiProperty({
		description: "The row where the seat is located",
		example: "A",
	})
	@IsString()
	@IsNotEmpty()
	row: string;

	@ApiProperty({
		description: "The type of seat",
		enum: SeatType,
		example: SeatType.STANDARD,
	})
	@IsEnum(SeatType)
	type: SeatType;
}
