import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "../enums/userRole.enum";
import { UserSurname } from "../enums/userSurname.enum";
import { Transform, TransformFnParams } from "class-transformer";
import { Types } from "mongoose";

export class UserResponseDto {
	@ApiProperty({ description: "User's unique identifier" })
	@Transform(({ value }: TransformFnParams) =>
		(value as Types.ObjectId).toString()
	)
	_id: string;

	@ApiProperty({ description: "User's first name" })
	firstName: string;

	@ApiProperty({ description: "User's last name" })
	lastName: string;

	@ApiProperty({
		description: "User's surname",
		enum: UserSurname,
		required: false,
	})
	surname?: UserSurname;

	@ApiProperty({ description: "User's email address" })
	email: string;

	@ApiProperty({ description: "User's phone number", required: false })
	phoneNumber?: string;

	@ApiProperty({ description: "User's date of birth", required: false })
	birthDate?: Date;

	@ApiProperty({ description: "User's role", enum: UserRole })
	role: UserRole;
}
