import { Type } from "class-transformer";
import {
	IsArray,
	IsObject,
	IsOptional,
	IsPositive,
	IsString,
	ValidateNested,
} from "class-validator";
import { SortOrder } from "mongoose";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class PaginationDto {
	@ApiPropertyOptional({
		description: "Number of items per page",
		minimum: 1,
		default: 10,
		example: 10,
	})
	@IsOptional()
	@IsPositive()
	limit?: number = 10;

	@ApiPropertyOptional({
		description: "Page number",
		minimum: 1,
		default: 1,
		example: 1,
	})
	@IsOptional()
	@IsPositive()
	page?: number = 1;

	@ApiPropertyOptional({
		description: "Fields to select in the response",
		type: [String],
		example: ["name", "description"],
	})
	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => String)
	select?: string[];

	@ApiPropertyOptional({
		description: "Related fields to populate",
		example: "category",
	})
	@IsOptional()
	@IsString()
	populate?: string;

	@ApiPropertyOptional({
		description: "Filter conditions",
		example: { status: "active", type: "movie" },
	})
	@IsObject()
	@IsOptional()
	@ValidateNested()
	@Type(() => Object)
	where?: Record<string, any>;

	@ApiPropertyOptional({
		description: "Sort criteria",
		example: { createdAt: -1, name: 1 },
	})
	@IsObject()
	@IsOptional()
	@ValidateNested()
	@Type(() => Object)
	sort?: Record<string, SortOrder>;
}
