import {
	IsDate,
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
} from "class-validator";
import { UserSurname } from "../enums/userSurname.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
	@ApiProperty({
		description: "User's first name",
		example: "John",
	})
	@IsString()
	@IsNotEmpty()
	firstName: string;

	@ApiProperty({
		description: "User's last name",
		example: "Doe",
	})
	@IsString()
	@IsNotEmpty()
	lastName: string;

	@ApiProperty({
		description: "User's surname from predefined options",
		enum: UserSurname,
		example: UserSurname.MR,
	})
	@IsEnum(UserSurname)
	@IsOptional()
	surname?: UserSurname;

	@ApiProperty({
		description: "User's email address",
		example: "john.doe@example.com",
	})
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty({
		description: "User's phone number",
		example: "+1234567890",
	})
	@IsString()
	@IsOptional()
	phoneNumber?: string;

	@ApiProperty({
		description: "User's password (optional)",
		example: "securePassword123",
		required: false,
	})
	@IsString()
	@IsOptional()
	password?: string;

	@ApiProperty({
		description: "User's date of birth",
		example: "1990-01-01",
		type: Date,
	})
	@IsDate()
	@IsOptional()
	birthDate?: Date;

	@ApiProperty({
		description: "Google ID for OAuth authentication (optional)",
		example: "123456789",
		required: false,
	})
	@IsString()
	@IsOptional()
	googleId?: string;
}
