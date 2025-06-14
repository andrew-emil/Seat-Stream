import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Movie } from "./movie.entity";
import { Model } from "mongoose";
import { CreateMovieDto } from "./dtos/createMovie.dto";

@Injectable()
export class MoviesService {
	constructor(
		@InjectModel(Movie.name)
		private movieModel: Model<Movie>
	) {}

	public async createMovie(movie: CreateMovieDto) {
		const existingMovie = await this.movieModel.findOne({
			title: movie.title,
		});

		if (existingMovie) throw new ConflictException("Movie already exists");

		const newMovie = new this.movieModel(movie);

		return await newMovie.save();
	}
}
