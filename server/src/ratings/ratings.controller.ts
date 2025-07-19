import { Body, Controller, Delete, Param, Patch, Post } from "@nestjs/common";
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiResponse,
	ApiTags,
} from "@nestjs/swagger";
import { ActiveUser } from "src/auth/decorators/active-user.decorator";
import { JwtPayload } from "src/auth/interfaces/jwt-payload";
import { CreateRatingDto } from "./dtos/createRating.dto";
import { UpdateRatingDto } from "./dtos/updateRating.dto";
import { RatingsService } from "./ratings.service";

@ApiTags("Ratings")
@ApiBearerAuth()
@Controller("ratings")
export class RatingsController {
	constructor(private readonly ratingsService: RatingsService) {}

	@Post("/:movieId")
	@ApiOperation({ summary: "Create a rating for a movie" })
	@ApiParam({ name: "movieId", description: "Movie ID" })
	@ApiResponse({ status: 201, description: "Rating successfully created" })
	@ApiResponse({
		status: 409,
		description: "User has already rated this movie",
	})
	public async createRating(
		@Param("movieId") movieId: string,
		@Body() createRatingDto: CreateRatingDto,
		@ActiveUser() user: JwtPayload
	) {
		return await this.ratingsService.createRating(
			createRatingDto,
			user.sub,
			movieId
		);
	}

	@Patch("/:movieId")
	@ApiOperation({ summary: "Update a rating for a movie" })
	@ApiParam({ name: "movieId", description: "Movie ID" })
	@ApiResponse({ status: 200, description: "Rating successfully updated" })
	@ApiResponse({ status: 404, description: "Rating not found" })
	public async updateRating(
		@Param("movieId") movieId: string,
		@Body() updateRatingDto: UpdateRatingDto,
		@ActiveUser() user: JwtPayload
	) {
		return await this.ratingsService.updateRating(
			updateRatingDto,
			user.sub,
			movieId
		);
	}

	@Delete("/:movieId")
	@ApiOperation({ summary: "Delete a rating for a movie" })
	@ApiParam({ name: "movieId", description: "Movie ID" })
	@ApiResponse({ status: 200, description: "Rating successfully deleted" })
	@ApiResponse({ status: 404, description: "Rating not found" })
	public async deleteRating(
		@Param("movieId") movieId: string,
		@ActiveUser() user: JwtPayload
	) {
		return await this.ratingsService.deleteRating(user.sub, movieId);
	}
}
