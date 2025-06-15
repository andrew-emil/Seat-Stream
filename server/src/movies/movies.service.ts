import {
	ConflictException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RatingsService } from "src/ratings/ratings.service";
import { CreateMovieDto } from "./dtos/createMovie.dto";
import { Movie } from "./movie.entity";
import { PaginationService } from "src/common/pagination/pagination.service";
import { MovieQueryDto } from "./dtos/movieQuery.dto";
import { UpdateMovieDto } from "./dtos/updatedMovie.dto";

@Injectable()
export class MoviesService {
	constructor(
		@InjectModel(Movie.name)
		private movieModel: Model<Movie>,
		private readonly ratingsService: RatingsService,
		private readonly paginationService: PaginationService
	) {}

	public async createMovie(movie: CreateMovieDto) {
		const existingMovie = await this.movieModel.findOne({
			title: movie.title,
		});

		if (existingMovie) throw new ConflictException("Movie already exists");

		const newMovie = new this.movieModel({
			...movie,
			createdAt: new Date(),
		});

		return await newMovie.save();
	}

	public async getMovie(id: string) {
		const movie = await this.movieModel.findById(id).populate("genres");
		if (!movie) throw new NotFoundException("Movie not found");

		const movieRatings = await this.ratingsService.getMovieRating(movie);

		return {
			movie,
			ratings: {
				total: movieRatings.length,
				average:
					movieRatings.reduce((acc, rating) => acc + rating.stars, 0) /
					movieRatings.length,
				movieRatings,
			},
		};
	}

	public async getMovies(query: MovieQueryDto) {
		const { page, limit, sort } = query;

		const result = await this.paginationService.paginate(this.movieModel, {
			page: Number(page) || 1,
			limit: Number(limit) || 10,
			sort: sort ? JSON.parse(sort) : {},
		});

		return result;
	}

	public async updateMovie(id: string, movie: UpdateMovieDto) {
		const updatedMovie = await this.movieModel.findByIdAndUpdate(id, movie);

		return updatedMovie;
	}

	public async deleteMovie(id: string) {
		const deletedMovie = await this.movieModel.findByIdAndDelete(id);

		return deletedMovie;
	}

	public async getPopularMovies() {
		return await this.movieModel
			.find({
				now_showing: true,
			})
			.limit(9)
			.sort({
				createdAt: 1,
			});
	}

	public async getMovieByNowShowing(now_showing: boolean) {
		const movies = await this.movieModel
			.find({
				now_showing,
			})
			.sort({
				createdAt: -1,
			});

		return movies;
	}

	public async getRecommendedMovies(userId: string) {
		//TODO: Implement this after bookings are implemented
	}

	public async searchMovies(query: string) {
		const movies = await this.movieModel
			.find(
				{
					$text: {
						$search: query,
					},
				},
				{
					$project: {
						score: {
							$meta: "textScore",
						},
					},
				}
			)
			.sort({
				score: {
					$meta: "textScore",
				},
			})
			.select([
				"title",
				"poster",
				"genres",
				"now_showing",
				"score",
				"description",
				"release_date",
				"running_time",
			]);

		return movies;
	}
}
