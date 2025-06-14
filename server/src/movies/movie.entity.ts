import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Genre } from "src/genres/genre.entity";

@Schema()
export class Movie extends Document {
	@Prop({
		required: true,
		type: String,
		unique: true,
	})
	title: string;

	@Prop({
		required: true,
		type: String,
	})
	description: string;

	@Prop({
		required: true,
		type: String,
	})
	trailer_url: string;

	@Prop({
		required: true,
		type: Boolean,
	})
	now_showing: boolean;

	@Prop({
		required: true,
		type: String,
	})
	language: string;

	@Prop({
		required: true,
		type: String,
	})
	subtitle: string;

	@Prop({
		required: true,
		type: Buffer,
	})
	poster: Buffer;

	@Prop({
		required: false,
		type: Number,
	})
	running_time: number;

	@Prop({
		required: true,
		type: Date,
	})
	release_date: Date;

	@Prop({
		required: true,
		type: [String],
	})
	starring: string[];

	@Prop({
		required: true,
		type: String,
	})
	director: string;

	@Prop({
		required: true,
		type: [Types.ObjectId],
		ref: Genre.name,
	})
	genres: Genre[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
