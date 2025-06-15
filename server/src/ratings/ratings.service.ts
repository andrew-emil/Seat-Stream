import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Rating } from "./rating.entity";
import { Model } from "mongoose";
import { Movie } from "src/movies/movie.entity";
import { CreateRatingDto } from "./dtos/createRating.dto";
import { UpdateRatingDto } from "./dtos/updateRating.dto";

@Injectable()
export class RatingsService {
	constructor(
		@InjectModel(Rating.name)
		private ratingModel: Model<Rating>
	) {}

	public async getMovieRating(movie: Movie) {
		const ratings = await this.ratingModel
			.find({ movie: movie._id })
			.populate("user");

		return ratings;
	}

	public async createRating(
		rating: CreateRatingDto,
		userId: string,
		movieId: string
	) {
		//TODO: Check if the movie exists
		//TODO: Check if the user booked the movie
		const existingRating = await this.ratingModel.findOne({
			user: userId,
			movie: movieId,
		});

		if (existingRating) {
			throw new ConflictException("You have already rated this movie");
		}

		const newRating = new this.ratingModel({
			...rating,
			createdAt: new Date(),
			user: userId,
			movie: movieId,
		});

		return await newRating.save();
	}

	public async updateRating(
		rating: UpdateRatingDto,
		userId: string,
		movieId: string
	) {
		const updatedRating = await this.ratingModel.findOneAndUpdate(
			{
				user: userId,
				movie: movieId,
			},
			{
				...rating,
				createdAt: new Date(),
			}
		);

		return updatedRating;
	}

	public async deleteRating(userId: string, movieId: string) {
		const deletedRating = await this.ratingModel.findOneAndDelete({
			user: userId,
			movie: movieId,
		});

		return deletedRating;
	}
}
