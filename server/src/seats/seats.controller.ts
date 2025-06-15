import { Controller, Post, Body, Patch, HttpCode, HttpStatus } from "@nestjs/common";
import { SeatsService } from "./seats.service";
import { CreateSeatDto } from "./dtos/createSeat.dto";
import { ActiveUser } from "src/auth/decorators/active-user.decorator";
import { JwtPayload } from "src/auth/interfaces/jwt-payload";
import { authorizeUser } from "src/common/utils/authorizeUser";
import { UserRole } from "src/users/enums/userRole.enum";
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBody,
	ApiBearerAuth,
} from "@nestjs/swagger";

@ApiTags("Seats")
@ApiBearerAuth()
@Controller("seats")
export class SeatsController {
	constructor(private readonly seatsService: SeatsService) {}

	@Post()
	@ApiOperation({ summary: "Create multiple seats" })
	@ApiBody({ type: [CreateSeatDto] })
	@ApiResponse({
		status: 201,
		description: "The seats have been successfully created.",
		type: [CreateSeatDto],
	})
	@ApiResponse({
		status: 403,
		description: "Forbidden - Only admins can create seats.",
	})
	public createSeats(
		@Body() seats: CreateSeatDto[],
		@ActiveUser() user: JwtPayload
	) {
		authorizeUser(user, UserRole.ADMIN);
		return this.seatsService.createSeats(seats);
	}

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
