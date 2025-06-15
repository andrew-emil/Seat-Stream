import {
	IsString,
	IsNotEmpty,
	IsUrl,
	IsNumber,
	IsOptional,
	IsDate,
	IsArray,
	IsMongoId,
	IsBoolean,
} from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateMovieDto {
	@ApiProperty({
		description: "The title of the movie",
		example: "The Dark Knight",
	})
	@IsString()
	@IsNotEmpty()
	title: string;

	@ApiProperty({
		description: "The description of the movie",
		example:
			"When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
	})
	@IsString()
	@IsNotEmpty()
	description: string;

	@ApiProperty({
		description: "The URL of the movie's trailer",
		example: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
	})
	@IsUrl()
	@IsNotEmpty()
	trailer_url: string;

	@ApiProperty({
		description: "The language of the movie",
		example: "English",
	})
	@IsString()
	@IsNotEmpty()
	language: string;

	@ApiProperty({
		description: "The subtitle language of the movie",
		example: "Spanish",
	})
	@IsString()
	@IsNotEmpty()
	subtitle: string;

	@ApiProperty({
		description: "Whether the movie is currently showing in theaters",
		example: true,
	})
	@IsNotEmpty()
	@IsBoolean()
	now_showing: boolean;

	@ApiPropertyOptional({
		description: "The movie poster image",
		type: "string",
		format: "binary",
	})
	@IsOptional()
	poster?: Buffer;

	@ApiPropertyOptional({
		description: "The running time of the movie in minutes",
		example: 152,
	})
	@IsNumber()
	@IsOptional()
	running_time?: number;

	@ApiProperty({
		description: "The release date of the movie",
		example: "2008-07-18",
	})
	@IsDate()
	@Type(() => Date)
	@IsNotEmpty()
	release_date: Date;

	@ApiProperty({
		description: "List of actors starring in the movie",
		example: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
	})
	@IsArray()
	@IsString({ each: true })
	@IsNotEmpty()
	starring: string[];

	@ApiProperty({
		description: "The director of the movie",
		example: "Christopher Nolan",
	})
	@IsString()
	@IsNotEmpty()
	director: string;

	@ApiProperty({
		description: "List of genre IDs associated with the movie",
		example: ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439012"],
	})
	@IsArray()
	@IsMongoId({ each: true })
	@IsNotEmpty()
	genres: string[];
}
