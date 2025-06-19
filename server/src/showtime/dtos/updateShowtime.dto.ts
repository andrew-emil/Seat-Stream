import { PartialType } from "@nestjs/mapped-types";
import { CreateShowtimeDto } from "./createShowtime.dto";
import { IsMongoId, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateShowtimeDto extends PartialType(CreateShowtimeDto) {
	@ApiProperty({
		description: "Showtime ID",
		example: "60d21b4667d0d8992e610c85",
	})
	@IsMongoId()
	@IsNotEmpty()
	id: string;
}
