import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { MenuItemType } from "../enums/menuItemType.enum";
import { MenuCategory } from "./menuCategory.entity";

@Schema()
export class MenuItem extends Document {
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

	@Prop({
		required: true,
		type: Types.ObjectId,
		ref: MenuCategory.name,
	})
	menuCategory: MenuCategory;

	@Prop({
		required: true,
		type: String,
		enum: MenuItemType,
	})
	type: MenuItemType;

	@Prop({
		required: true,
		type: Types.Double,
	})
	price: number;

	@Prop({
		required: true,
		type: Number,
	})
	quantity: number;

	@Prop({
		required: true,
		type: Types.Buffer,
	})
	image: Buffer;
}

export const menuItemSchema = SchemaFactory.createForClass(MenuItem);
