import {
	Body,
	Controller,
	Delete,
	ForbiddenException,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Put,
	Query,
} from "@nestjs/common";
import { GenresService } from "./genres.service";
import { GenreQueryDto } from "./dtos/genreQuery.dto";
import { ActiveUser } from "src/auth/decorators/active-user.decorator";
import { JwtPayload } from "src/auth/interfaces/jwt-payload";
import { UserRole } from "src/users/enums/userRole.enum";
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth,
	ApiParam,
	ApiBody,
	ApiQuery,
} from "@nestjs/swagger";

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
	public createGenre(
		@Body("name") name: string,
		@ActiveUser() user: JwtPayload
	) {
		if (user.role !== UserRole.ADMIN) {
			throw new ForbiddenException(
				"You are not authorized to access this resource"
			);
		}
		return this.genresService.createGenre(name);
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
	public getGenres(
		@Query() query: GenreQueryDto,
		@ActiveUser() user: JwtPayload
	) {
		if (user.role !== UserRole.ADMIN) {
			throw new ForbiddenException(
				"You are not authorized to access this resource"
			);
		}
		return this.genresService.getGenres(query);
	}

	@Get("all")
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: "Get all genres without pagination" })
	@ApiResponse({ status: 200, description: "Returns all genres" })
	@ApiResponse({
		status: 403,
		description: "Forbidden - Admin access required",
	})
	public getGenresWithoutPagination(@ActiveUser() user: JwtPayload) {
		if (user.role !== UserRole.ADMIN) {
			throw new ForbiddenException(
				"You are not authorized to access this resource"
			);
		}
		return this.genresService.getGenresWithoutPagination();
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
	public updateGenre(
		@Param("id") id: string,
		@Body() name: string,
		@ActiveUser() user: JwtPayload
	) {
		if (user.role !== UserRole.ADMIN) {
			throw new ForbiddenException(
				"You are not authorized to access this resource"
			);
		}
		return this.genresService.updateGenre(id, name);
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
	public deleteGenre(@Param("id") id: string, @ActiveUser() user: JwtPayload) {
		if (user.role !== UserRole.ADMIN) {
			throw new ForbiddenException(
				"You are not authorized to access this resource"
			);
		}
		return this.genresService.deleteGenre(id);
	}
}
