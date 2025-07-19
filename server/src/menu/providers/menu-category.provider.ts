import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MenuCategory } from "../entities/menuCategory.entity";
import { CreateMenuCategoryDto } from "../dto/create-menu.dto";
import { UpdateMenuCategoryDto } from "../dto/update-menu.dto";

@Injectable()
export class MenuCategoryProvider {
	constructor(
		@InjectModel(MenuCategory.name)
		private readonly menuCategoryModel: Model<MenuCategory>
	) {}

	async create(createDto: CreateMenuCategoryDto) {
		const existingCategory = await this.menuCategoryModel.findOne({
			name: createDto.name,
		});

        if(existingCategory)
            throw new ConflictException("This Category already exist")

        return await this.menuCategoryModel.create(createDto);
	}

	async findAll() {
		return await this.menuCategoryModel.find().exec();
	}

	async findOne(id: string) {
		return await this.menuCategoryModel.findById(id).exec();
	}

	async update(id: string, updateDto: UpdateMenuCategoryDto) {
		return await this.menuCategoryModel
			.findByIdAndUpdate(id, updateDto, { new: true })
			.exec();
	}

	async remove(id: string) {
		return await this.menuCategoryModel.findByIdAndDelete(id).exec();
	}
}
