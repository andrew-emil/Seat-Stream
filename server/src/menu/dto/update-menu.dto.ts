import { PartialType } from "@nestjs/swagger";
import { CreateMenuCategoryDto, CreateMenuItemDto } from "./create-menu.dto";

export class UpdateMenuCategoryDto extends PartialType(CreateMenuCategoryDto) {}

export class UpdateMenuItemDto extends PartialType(CreateMenuItemDto) {}
