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

export class CreateMovieDto {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsString()
	@IsNotEmpty()
	description: string;

	@IsUrl()
	@IsNotEmpty()
	trailer_url: string;

	@IsString()
	@IsNotEmpty()
	language: string;

	@IsString()
	@IsNotEmpty()
	subtitle: string;

	@IsNotEmpty()
	@IsBoolean()
	now_showing: boolean;

	@IsOptional()
	poster?: Buffer;

	@IsNumber()
	@IsOptional()
	running_time?: number;

	@IsDate()
	@Type(() => Date)
	@IsNotEmpty()
	release_date: Date;

	@IsArray()
	@IsString({ each: true })
	@IsNotEmpty()
	starring: string[];

	@IsString()
	@IsNotEmpty()
	director: string;

	@IsArray()
	@IsMongoId({ each: true })
	@IsNotEmpty()
	genres: string[];
}
