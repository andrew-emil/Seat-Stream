import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Seat } from "src/seats/seat.entity";

@Schema()
export class Theater extends Document {
	@Prop({
		required: true,
		type: String,
	})
	name: string;

	@Prop({
		required: true,
		type: String,
	})
	location: string;

	@Prop({
		required: true,
		type: Number,
	})
	capacity: number;

	@Prop({
		required: true,
		type: [Types.ObjectId],
		ref: Seat.name,
	})
	seats: Seat[];

	@Prop({
		required: true,
		type: [[String]],
	})
	seat_map: string[][];
}

export const TheaterSchema = SchemaFactory.createForClass(Theater);
