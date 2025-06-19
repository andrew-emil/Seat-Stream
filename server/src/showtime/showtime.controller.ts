import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth,
	ApiParam,
	ApiBody,
} from "@nestjs/swagger";
import { ShowtimeService } from "./showtime.service";
import { CreateShowtimeDto } from "./dtos/createShowtime.dto";
import { UpdateShowtimeDto } from "./dtos/updateShowtime.dto";
import { ActiveUser } from "src/auth/decorators/active-user.decorator";
import { JwtPayload } from "src/auth/interfaces/jwt-payload";
import { authorizeUser } from "src/common/utils/authorizeUser";
import { Auth } from "src/auth/decorators/auth.decorator";
import { AuthType } from "src/auth/enums/authType.enum";

@ApiTags("Showtime")
@ApiBearerAuth()
@Controller("showtime")
export class ShowtimeController {
	constructor(private readonly showtimeService: ShowtimeService) {}

	@Get("movie/:movieId/admin")
	@ApiOperation({ summary: "Get showtime by movie for admin" })
	@ApiParam({ name: "movieId", description: "Movie ID" })
	@ApiResponse({ status: 200, description: "Showtime found" })
	@ApiResponse({ status: 404, description: "Movie has no showtime" })
	async getShowtimeByMovieToAdmin(
		@Param("movieId") movieId: string,
		@ActiveUser() user: JwtPayload
	) {
		authorizeUser(user);
		return this.showtimeService.getShowtimeByMovieToAdmin(movieId);
	}

	@Get("movie/:movieId")
	@ApiOperation({ summary: "Get showtime by movie" })
	@ApiParam({ name: "movieId", description: "Movie ID" })
	@ApiResponse({ status: 200, description: "Showtime found" })
	@ApiResponse({ status: 404, description: "Movie has no showtime" })
	@Auth(AuthType.NONE)
	async getShowtimeByMovie(@Param("movieId") movieId: string) {
		return this.showtimeService.getShowtimeByMovie(movieId);
	}

	@Get(":id")
	@ApiOperation({ summary: "Get showtime by ID" })
	@ApiParam({ name: "id", description: "Showtime ID" })
	@ApiResponse({ status: 200, description: "Showtime found" })
	@ApiResponse({ status: 404, description: "Showtime Not Found" })
	async getShowtimeById(@Param("id") id: string) {
		return this.showtimeService.getShowtimeById(id);
	}

	@Post()
	@ApiOperation({ summary: "Create a new showtime" })
	@ApiBody({ type: CreateShowtimeDto })
	@ApiResponse({ status: 201, description: "Showtime created" })
	@ApiResponse({ status: 409, description: "Showtime already exist" })
	async createShowtime(
		@Body() createShowtimeDto: CreateShowtimeDto,
		@ActiveUser() user: JwtPayload
	) {
		authorizeUser(user);
		return this.showtimeService.createShowtime(createShowtimeDto);
	}

	@Patch()
	@ApiOperation({ summary: "Update a showtime" })
	@ApiBody({ type: UpdateShowtimeDto })
	@ApiResponse({ status: 200, description: "Showtime updated" })
	@ApiResponse({ status: 404, description: "Showtime Not Found" })
	async updateShowtime(
		@Body() updateShowtimeDto: UpdateShowtimeDto,
		@ActiveUser() user: JwtPayload
	) {
		authorizeUser(user);
		return this.showtimeService.updateShowtime(updateShowtimeDto);
	}

	@Delete(":id")
	@ApiOperation({ summary: "Delete a showtime" })
	@ApiParam({ name: "id", description: "Showtime ID" })
	@ApiResponse({ status: 204, description: "Showtime deleted" })
	@ApiResponse({ status: 404, description: "Showtime Not Found" })
    @HttpCode(HttpStatus.NO_CONTENT)
	async deleteShowtime(
		@Param("id") id: string,
		@ActiveUser() user: JwtPayload
	) {
		authorizeUser(user);
		return this.showtimeService.deleteShowtime(id);
	}
}
