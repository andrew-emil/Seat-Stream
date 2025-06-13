import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserSurname } from "./enums/userSurname.enum";
import { UserRole } from "./enums/userRole.enum";
import { Document } from "mongoose";
import { Exclude } from "class-transformer";

@Schema()
export class User extends Document {
	@Prop({
		required: true,
		type: String,
	})
	firstName: string;

	@Prop({
		required: true,
		type: String,
	})
	lastName: string;

	@Prop({
		required: false,
		type: String,
		enum: UserSurname,
	})
	surname?: UserSurname;

	@Prop({
		required: true,
		unique: true,
		type: String,
	})
	email: string;

	@Prop({
		required: false,
		unique: true,
		type: String,
	})
	phoneNumber?: string;

	@Prop({
		required: false,
		type: String,
	})
	@Exclude()
	password?: string;

	@Prop({
		required: false,
		type: Date,
	})
	birthDate?: Date;

	@Prop({
		required: true,
		type: String,
		enum: UserRole,
		default: UserRole.USER,
	})
	role: UserRole;

	@Prop({
		required: false,
		type: String,
	})
	@Exclude()
	googleId?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
