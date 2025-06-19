import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Movie } from "src/movies/movie.entity";
import { Theater } from "src/theaters/theater.entity";

@Schema({ collection: "Showtime" })
export class Showtime extends Document {
	@Prop({
		required: true,
		type: Types.ObjectId,
		ref: Movie.name,
	})
	movie: Movie;

	@Prop({
		required: true,
		type: Types.ObjectId,
		ref: Theater.name,
	})
	theater: Theater;

	@Prop({
		required: true,
		match: /^([0-1]\d|2[0-3]):([0-5]\d)$/,
	})
	startTime: string;

	@Prop({
		required: true,
		type: Date,
	})
	date: Date;

	@Prop({
		required: true,
		type: Types.Double,
	})
	price: number;

	@Prop({
		required: true,
		type: Boolean,
		default: true,
	})
	is_available: boolean;
}

export const showtimeSchema = SchemaFactory.createForClass(Showtime);

showtimeSchema.index(
	{ movie: 1, theater: 1, startTime: 1, date: 1 },
	{ unique: true }
);
