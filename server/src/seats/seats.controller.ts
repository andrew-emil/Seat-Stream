import { Body, Controller, HttpCode, HttpStatus, Patch } from "@nestjs/common";
import {
	ApiBearerAuth,
	ApiBody,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from "@nestjs/swagger";
import { SeatsService } from "./seats.service";

@ApiTags("Seats")
@ApiBearerAuth()
@Controller("seats")
export class SeatsController {
	constructor(private readonly seatsService: SeatsService) {}

	@Patch("/book")
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: "Book multiple seats" })
	@ApiBody({
		type: [String],
		description: "Array of seat IDs to book",
		examples: {
			"example 1": {
				value: ["seat-id-1", "seat-id-2"],
			},
		},
	})
	@ApiResponse({
		status: 200,
		description: "The seats have been successfully booked.",
		type: [String],
	})
	public bookSeats(@Body() seatIds: string[]) {
		return this.seatsService.bookSeats(seatIds);
	}
}
