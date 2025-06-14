import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema()
export class Genre extends Document {
	@ApiProperty({
		description: "The unique identifier of the genre",
		example: "507f1f77bcf86cd799439011"
	})
	declare _id: string;

	@ApiProperty({
		description: "The name of the genre",
		example: "Action",
		required: true
	})
	@Prop({
		required: true,
		type: String,
		unique: true,
	})
	name: string;
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
