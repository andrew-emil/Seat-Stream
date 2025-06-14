import { IsString, IsOptional } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class GenreQueryDto {
	@ApiPropertyOptional({
		description: "Page number for pagination",
		example: "1",
	})
	@IsOptional()
	@IsString()
	page?: string;

	@ApiPropertyOptional({
		description: "Number of items per page",
		example: "10",
	})
	@IsOptional()
	@IsString()
	limit?: string;

	@ApiPropertyOptional({
		description: 'Sort field and direction (e.g. "name:asc" or "name:desc")',
		example: "name:asc",
	})
	@IsOptional()
	@IsString()
	sort?: string;
}
