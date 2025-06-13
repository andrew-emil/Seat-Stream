import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty, ApiTags } from "@nestjs/swagger";

@ApiTags("Authentication")
export class LoginDto {
	@ApiProperty({
		description: "User's email address",
		example: "john.doe@example.com",
		required: true,
	})
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty({
		description: "User's password",
		example: "securePassword123",
		required: true,
	})
	@IsString()
	@IsNotEmpty()
	password: string;
}
