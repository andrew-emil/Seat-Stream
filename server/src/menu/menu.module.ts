import { Module } from "@nestjs/common";
import { MenuService } from "./menu.service";
import { MenuController } from "./menu.controller";
import { MongooseModule } from "@nestjs/mongoose";
import {
	MenuCategory,
	menuCategorySchema,
} from "./entities/menuCategory.entity";
import { MenuItem, menuItemSchema } from "./entities/menuItem.entity";
import { MenuItemProvider } from './providers/menu-item.provider';
import { MenuCategoryProvider } from './providers/menu-category.provider';

@Module({
	controllers: [MenuController],
	providers: [MenuService, MenuItemProvider, MenuCategoryProvider],
	imports: [
		MongooseModule.forFeature([
			{ name: MenuCategory.name, schema: menuCategorySchema },
			{ name: MenuItem.name, schema: menuItemSchema },
		]),
	],
})
export class MenuModule {}
