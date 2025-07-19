import { Injectable } from "@nestjs/common";
import {
	CreateMenuCategoryDto,
	CreateMenuItemDto,
} from "./dto/create-menu.dto";
import {
	UpdateMenuCategoryDto,
	UpdateMenuItemDto,
} from "./dto/update-menu.dto";
import { MenuCategoryProvider } from "./providers/menu-category.provider";
import { MenuItemProvider } from "./providers/menu-item.provider";

@Injectable()
export class MenuService {
	constructor(
		private readonly menuCategoryProvider: MenuCategoryProvider,
		private readonly menuItemProvider: MenuItemProvider
	) {}

	// --- MenuCategory CRUD ---
	async createMenuCategory(dto: CreateMenuCategoryDto) {
		return await this.menuCategoryProvider.create(dto);
	}
	async findAllMenuCategories() {
		return await this.menuCategoryProvider.findAll();
	}
	async findOneMenuCategory(id: string) {
		return await this.menuCategoryProvider.findOne(id);
	}
	async updateMenuCategory(id: string, dto: UpdateMenuCategoryDto) {
		return await this.menuCategoryProvider.update(id, dto);
	}
	async removeMenuCategory(id: string) {
		return await this.menuCategoryProvider.remove(id);
	}

	// --- MenuItem CRUD ---
	async createMenuItem(dto: CreateMenuItemDto) {
		return await this.menuItemProvider.create(dto);
	}
	async findAllMenuItems() {
		return await this.menuItemProvider.findAll();
	}
	async findOneMenuItem(id: string) {
		return await this.menuItemProvider.findOne(id);
	}
	async updateMenuItem(id: string, dto: UpdateMenuItemDto) {
		return await this.menuItemProvider.update(id, dto);
	}
	async removeMenuItem(id: string) {
		return await this.menuItemProvider.remove(id);
	}
	async countSnacks() {
		return await this.menuItemProvider.countSnacks();
	}
}
