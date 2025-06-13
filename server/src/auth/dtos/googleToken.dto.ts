import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty, ApiTags } from "@nestjs/swagger";

@ApiTags("Authentication")
export class GoogleTokenDto {
	@ApiProperty({
		description: "Google OAuth token",
		example: "ya29.a0AfB_byC...",
		required: true,
	})
	@IsNotEmpty()
	@IsString()
	token: string;
}
