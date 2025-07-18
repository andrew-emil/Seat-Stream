import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Put,
	Query,
} from "@nestjs/common";
import {
	ApiBearerAuth,
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiQuery,
	ApiResponse,
	ApiTags,
} from "@nestjs/swagger";
import { ActiveUser } from "src/auth/decorators/active-user.decorator";
import { JwtPayload } from "src/auth/interfaces/jwt-payload";
import { authorizeUser } from "src/common/utils/authorizeUser";
import { GenreQueryDto } from "./dtos/genreQuery.dto";
import { GenresService } from "./genres.service";

@ApiTags("Genres")
@ApiBearerAuth()
@Controller("genres")
export class GenresController {
	constructor(private readonly genresService: GenresService) {}

	@Post()
	@ApiOperation({ summary: "Create a new genre" })
	@ApiBody({ description: "Genre name", type: String })
	@ApiResponse({ status: 201, description: "Genre successfully created" })
	@ApiResponse({
		status: 403,
		description: "Forbidden - Admin access required",
	})
	@ApiResponse({ status: 409, description: "Genre already exists" })
	public async createGenre(
		@Body("name") name: string,
		@ActiveUser() user: JwtPayload
	) {
		authorizeUser(user);
		return await this.genresService.createGenre(name);
	}

	@Get()
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: "Get paginated list of genres" })
	@ApiQuery({ type: GenreQueryDto })
	@ApiResponse({ status: 200, description: "Returns paginated list of genres" })
	@ApiResponse({
		status: 403,
		description: "Forbidden - Admin access required",
	})
	public async getGenres(
		@Query() query: GenreQueryDto,
		@ActiveUser() user: JwtPayload
	) {
		authorizeUser(user);
		return await this.genresService.getGenres(query);
	}

	@Get("all")
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: "Get all genres without pagination" })
	@ApiResponse({ status: 200, description: "Returns all genres" })
	@ApiResponse({
		status: 403,
		description: "Forbidden - Admin access required",
	})
	public async getGenresWithoutPagination(@ActiveUser() user: JwtPayload) {
		authorizeUser(user);
		return await this.genresService.getGenresWithoutPagination();
	}

	@Put("/:id")
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: "Update a genre" })
	@ApiParam({ name: "id", description: "Genre ID" })
	@ApiBody({ description: "New genre name", type: String })
	@ApiResponse({ status: 200, description: "Genre successfully updated" })
	@ApiResponse({
		status: 403,
		description: "Forbidden - Admin access required",
	})
	@ApiResponse({ status: 404, description: "Genre not found" })
	public async updateGenre(
		@Param("id") id: string,
		@Body() name: string,
		@ActiveUser() user: JwtPayload
	) {
		authorizeUser(user);
		return await this.genresService.updateGenre(id, name);
	}

	@Delete("/:id")
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({ summary: "Delete a genre" })
	@ApiParam({ name: "id", description: "Genre ID" })
	@ApiResponse({ status: 204, description: "Genre successfully deleted" })
	@ApiResponse({
		status: 403,
		description: "Forbidden - Admin access required",
	})
	@ApiResponse({ status: 404, description: "Genre not found" })
	public async deleteGenre(
		@Param("id") id: string,
		@ActiveUser() user: JwtPayload
	) {
		authorizeUser(user);
		return await this.genresService.deleteGenre(id);
	}
}
