import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Movie } from "src/movies/movie.entity";

import { User } from "src/users/user.entity";

@Schema()
export class Rating extends Document {
	@Prop({
		required: true,
		type: Number,
		min: 1,
		max: 10,
	})
	stars: number;

	@Prop({
		required: false,
		type: String,
	})
	comment: string;

	@Prop({
		required: true,
		default: Date.now,
		type: Date,
	})
	createdAt: Date;

	@Prop({
		type: Types.ObjectId,
		ref: Movie.name,
		required: true,
	})
	movie: Movie;

	@Prop({
		type: Types.ObjectId,
		ref: User.name,
		required: true,
	})
	user: User;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
