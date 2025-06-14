import {
    Body,
    Controller,
    ForbiddenException,
    Post,
    UploadedFile,
    UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ActiveUser } from "src/auth/decorators/active-user.decorator";
import { JwtPayload } from "src/auth/interfaces/jwt-payload";
import { UserRole } from "src/users/enums/userRole.enum";
import { CreateMovieDto } from "./dtos/createMovie.dto";
import { MoviesService } from "./movies.service";

@Controller("movies")
export class MoviesController {
	constructor(private readonly moviesService: MoviesService) {}

	@Post()
	@UseInterceptors(FileInterceptor("poster"))
	public async createMovie(
		@Body() movie: CreateMovieDto,
		@UploadedFile() poster: Express.Multer.File,
		@ActiveUser() user: JwtPayload
	) {
		if (user.role !== UserRole.ADMIN) {
			throw new ForbiddenException("You are not authorized to create a movie");
		}
		movie.poster = poster.buffer;

		return await this.moviesService.createMovie(movie);
	}
}
