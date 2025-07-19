import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class MenuCategory extends Document {
	@Prop({
		required: true,
		type: String,
		unique: true,
	})
	name: string;

	@Prop({
		required: false,
		type: String,
	})
	description: string;
}

export const menuCategorySchema = SchemaFactory.createForClass(MenuCategory);
