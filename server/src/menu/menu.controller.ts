import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	HttpCode,
	HttpStatus,
	UseInterceptors,
	UploadedFile,
} from "@nestjs/common";
import { MenuService } from "./menu.service";
import {
	CreateMenuCategoryDto,
	CreateMenuItemDto,
} from "./dto/create-menu.dto";
import {
	UpdateMenuCategoryDto,
	UpdateMenuItemDto,
} from "./dto/update-menu.dto";
import { ActiveUser } from "src/auth/decorators/active-user.decorator";
import { JwtPayload } from "src/auth/interfaces/jwt-payload";
import { authorizeUser } from "src/common/utils/authorizeUser";
import { Auth } from "src/auth/decorators/auth.decorator";
import { AuthType } from "src/auth/enums/authType.enum";
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth,
} from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("Menu")
@ApiBearerAuth()
@Controller("menu")
export class MenuController {
	constructor(private readonly menuService: MenuService) {}

	// --- Menu Category Endpoints ---
	@Post("category")
	@ApiOperation({ summary: "Create a new menu category" })
	@ApiResponse({
		status: 201,
		description: "Menu category created successfully.",
	})
	async createCategory(
		@Body() dto: CreateMenuCategoryDto,
		@ActiveUser() user: JwtPayload
	) {
		authorizeUser(user);
		return await this.menuService.createMenuCategory(dto);
	}

	@Get("category")
	@Auth(AuthType.NONE)
	@ApiOperation({ summary: "Get all menu categories" })
	@ApiResponse({ status: 200, description: "List of menu categories." })
	async findAllCategories() {
		return await this.menuService.findAllMenuCategories();
	}

	@Get("category/:id")
	@Auth(AuthType.NONE)
	@ApiOperation({ summary: "Get a menu category by ID" })
	@ApiResponse({ status: 200, description: "Menu category found." })
	async findOneCategory(@Param("id") id: string) {
		return await this.menuService.findOneMenuCategory(id);
	}

	@Patch("category/:id")
	@ApiOperation({ summary: "Update a menu category by ID" })
	@ApiResponse({
		status: 200,
		description: "Menu category updated successfully.",
	})
	async updateCategory(
		@Param("id") id: string,
		@Body() dto: UpdateMenuCategoryDto,
		@ActiveUser() user: JwtPayload
	) {
		authorizeUser(user);
		return await this.menuService.updateMenuCategory(id, dto);
	}

	@Delete("category/:id")
	@ApiOperation({ summary: "Delete a menu category by ID" })
	@ApiResponse({
		status: 204,
		description: "Menu category deleted successfully.",
	})
	@HttpCode(HttpStatus.NO_CONTENT)
	async removeCategory(
		@Param("id") id: string,
		@ActiveUser() user: JwtPayload
	) {
		authorizeUser(user);
		return await this.menuService.removeMenuCategory(id);
	}

	// --- Menu Item Endpoints ---
	@Post("item")
	@UseInterceptors(FileInterceptor("image"))
	@ApiOperation({ summary: "Create a new menu item" })
	@ApiResponse({ status: 201, description: "Menu item created successfully." })
	async createItem(
		@Body() dto: CreateMenuItemDto,
		@UploadedFile() image: Express.Multer.File,
		@ActiveUser() user: JwtPayload
	) {
		authorizeUser(user);
		dto.image = image.buffer;
		return await this.menuService.createMenuItem(dto);
	}

	@Get("item")
	@Auth(AuthType.NONE)
	@ApiOperation({ summary: "Get all menu items" })
	@ApiResponse({ status: 200, description: "List of menu items." })
	async findAllItems() {
		return await this.menuService.findAllMenuItems();
	}

	@Get("item/:id")
	@Auth(AuthType.NONE)
	@ApiOperation({ summary: "Get a menu item by ID" })
	@ApiResponse({ status: 200, description: "Menu item found." })
	async findOneItem(@Param("id") id: string) {
		return await this.menuService.findOneMenuItem(id);
	}

	@Patch("item/:id")
	@UseInterceptors(FileInterceptor("image"))
	@ApiOperation({ summary: "Update a menu item by ID" })
	@ApiResponse({ status: 200, description: "Menu item updated successfully." })
	async updateItem(
		@Param("id") id: string,
		@Body() dto: UpdateMenuItemDto,
		@ActiveUser() user: JwtPayload,
		@UploadedFile() image: Express.Multer.File
	) {
		authorizeUser(user);
		dto.image = image.buffer;
		return await this.menuService.updateMenuItem(id, dto);
	}

	@Delete("item/:id")
	@ApiOperation({ summary: "Delete a menu item by ID" })
	@ApiResponse({ status: 204, description: "Menu item deleted successfully." })
	@HttpCode(HttpStatus.NO_CONTENT)
	async removeItem(@Param("id") id: string, @ActiveUser() user: JwtPayload) {
		authorizeUser(user);
		return await this.menuService.removeMenuItem(id);
	}
}
