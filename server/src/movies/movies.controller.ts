import {
	Body,
	Controller,
	Get,
	Param,
	Delete,
	Post,
	Patch,
	Query,
	UploadedFile,
	UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ActiveUser } from "src/auth/decorators/active-user.decorator";
import { JwtPayload } from "src/auth/interfaces/jwt-payload";
import { UserRole } from "src/users/enums/userRole.enum";
import { CreateMovieDto } from "./dtos/createMovie.dto";
import { MoviesService } from "./movies.service";
import { MovieQueryDto } from "./dtos/movieQuery.dto";
import { authorizeUser } from "src/common/utils/authorizeUser";
import { UpdateMovieDto } from "./dtos/updatedMovie.dto";
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth,
	ApiParam,
	ApiBody,
	ApiConsumes,
	ApiQuery,
} from "@nestjs/swagger";

//TODO: make auth public for some routes

@ApiTags("Movies")
@ApiBearerAuth()
@Controller("movies")
export class MoviesController {
	constructor(private readonly moviesService: MoviesService) {}

	@Post()
	@UseInterceptors(FileInterceptor("poster"))
	@ApiOperation({ summary: "Create a new movie" })
	@ApiConsumes("multipart/form-data")
	@ApiBody({ type: CreateMovieDto })
	@ApiResponse({ status: 201, description: "Movie successfully created" })
	@ApiResponse({
		status: 403,
		description: "Forbidden - Admin access required",
	})
	@ApiResponse({ status: 409, description: "Movie already exists" })
	public createMovie(
		@Body() movie: CreateMovieDto,
		@UploadedFile() poster: Express.Multer.File,
		@ActiveUser() user: JwtPayload
	) {
		authorizeUser(user, UserRole.ADMIN);
		movie.poster = poster.buffer;

		return this.moviesService.createMovie(movie);
	}

	@Get()
	@ApiOperation({ summary: "Get paginated list of movies" })
	@ApiQuery({ type: MovieQueryDto })
	@ApiResponse({ status: 200, description: "Returns paginated list of movies" })
	@ApiResponse({
		status: 403,
		description: "Forbidden - Admin access required",
	})
	public getMovies(
		@Query() query: MovieQueryDto,
		@ActiveUser() user: JwtPayload
	) {
		console.log("first")
		authorizeUser(user, UserRole.ADMIN);
		return this.moviesService.getMovies(query);
	}

	@Get("/popular")
	@ApiOperation({ summary: "Get popular movies" })
	@ApiResponse({ status: 200, description: "Returns list of popular movies" })
	public getPopularMovies() {
		return this.moviesService.getPopularMovies();
	}

	@Get("/now-showing")
	@ApiOperation({ summary: "Get movies by now showing status" })
	@ApiQuery({
		name: "nowShowing",
		type: Boolean,
		description: "Filter by now showing status",
	})
	@ApiResponse({
		status: 200,
		description: "Returns list of movies filtered by now showing status",
	})
	public getMovieByNowShowing(@Query("nowShowing") nowShowing: boolean) {
		return this.moviesService.getMovieByNowShowing(nowShowing);
	}

	@Get("/recommended")
	@ApiOperation({ summary: "Get recommended movies for user" })
	@ApiResponse({
		status: 200,
		description: "Returns list of recommended movies",
	})
	@ApiResponse({ status: 401, description: "Unauthorized" })
	public getRecommendedMovies(@ActiveUser() user: JwtPayload) {
		return this.moviesService.getRecommendedMovies(user.sub);
	}

	@Get("/:id")
	@ApiOperation({ summary: "Get a movie by ID" })
	@ApiParam({ name: "id", description: "Movie ID" })
	@ApiResponse({ status: 200, description: "Returns the movie details" })
	@ApiResponse({ status: 404, description: "Movie not found" })
	public getMovie(@Param("id") id: string) {
		return this.moviesService.getMovie(id);
	}

	@Patch("/:id")
	@UseInterceptors(FileInterceptor("poster"))
	@ApiOperation({ summary: "Update a movie" })
	@ApiConsumes("multipart/form-data")
	@ApiParam({ name: "id", description: "Movie ID" })
	@ApiBody({ type: UpdateMovieDto })
	@ApiResponse({ status: 200, description: "Movie successfully updated" })
	@ApiResponse({
		status: 403,
		description: "Forbidden - Admin access required",
	})
	@ApiResponse({ status: 404, description: "Movie not found" })
	public updateMovie(
		@Param("id") id: string,
		@Body() movie: UpdateMovieDto,
		@ActiveUser() user: JwtPayload,
		@UploadedFile() poster: Express.Multer.File
	) {
		authorizeUser(user, UserRole.ADMIN);
		movie.poster = poster.buffer;
		return this.moviesService.updateMovie(id, movie);
	}

	@Delete("/:id")
	@ApiOperation({ summary: "Delete a movie" })
	@ApiParam({ name: "id", description: "Movie ID" })
	@ApiResponse({ status: 200, description: "Movie successfully deleted" })
	@ApiResponse({
		status: 403,
		description: "Forbidden - Admin access required",
	})
	@ApiResponse({ status: 404, description: "Movie not found" })
	public deleteMovie(@Param("id") id: string, @ActiveUser() user: JwtPayload) {
		authorizeUser(user, UserRole.ADMIN);
		return this.moviesService.deleteMovie(id);
	}

	@Get("/search")
	@ApiOperation({ summary: "Search for movies" })
	@ApiQuery({ name: "query", type: String, description: "Search query" })
	@ApiResponse({
		status: 200,
		description: "Returns list of movies matching the search query",
	})
	public searchMovies(@Query("query") query: string) {
		return this.moviesService.searchMovies(query);
	}
}
