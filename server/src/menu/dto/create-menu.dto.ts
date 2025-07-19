import { ApiProperty } from "@nestjs/swagger";
import {
	IsString,
	IsNotEmpty,
	IsOptional,
	IsMongoId,
	IsEnum,
	IsNumber,
	Min,
	IsInt,
} from "class-validator";
import { MenuItemType } from "../enums/menuItemType.enum";

export class CreateMenuCategoryDto {
	@ApiProperty({
		description: "The unique name of the menu category",
		example: "Appetizers",
	})
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty({
		description: "A description of the menu category",
		example: "Starters and small plates",
		required: false,
	})
	@IsOptional()
	@IsString()
	description?: string;
}

export class CreateMenuItemDto {
	@ApiProperty({
		description: "The unique name of the menu item",
		example: "Cheeseburger",
	})
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty({
		description: "The ID of the menu category",
		example: "60c72b2f9b1e8e5a2c8f9b1e",
	})
	@IsMongoId()
	@IsNotEmpty()
	menuCategory: string;

	@ApiProperty({
		description: "The type of the menu item",
		enum: MenuItemType,
		example: MenuItemType.FOOD,
	})
	@IsEnum(MenuItemType)
	type: MenuItemType;

	@ApiProperty({ description: "The price of the menu item", example: 9.99 })
	@IsNumber()
	@Min(0)
	price: number;

	@ApiProperty({ description: "The number of items available", example: 10 })
	@IsInt()
	@Min(0)
	quantity: number;

	@ApiProperty({
		description: "The image of the menu item as a Buffer (base64 string)",
		type: "string",
		format: "binary",
	})
	@IsOptional()
	image?: Buffer;
}
