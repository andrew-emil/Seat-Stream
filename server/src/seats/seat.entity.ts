import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { SeatType } from "./enums/seatType.enum";

@Schema()
export class Seat extends Document {
	@Prop({
		required: true,
		type: String,
	})
	seat_number: string;

	@Prop({
		required: true,
		type: String,
	})
	row: string;

	@Prop({
		required: true,
		type: Boolean,
		default: true,
	})
	is_available: boolean;

	@Prop({
		required: true,
		type: String,
		enum: SeatType,
		default: SeatType.STANDARD,
	})
	type: SeatType;
}

export const SeatSchema = SchemaFactory.createForClass(Seat);
