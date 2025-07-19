import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MenuItem } from "../entities/menuItem.entity";
import { CreateMenuItemDto } from "../dto/create-menu.dto";
import { UpdateMenuItemDto } from "../dto/update-menu.dto";

@Injectable()
export class MenuItemProvider {
	constructor(
		@InjectModel(MenuItem.name)
		private readonly menuItemModel: Model<MenuItem>
	) {}

	async create(createDto: CreateMenuItemDto) {
		const existingItem = await this.menuItemModel.findOne({
			name: createDto.name,
		});

		if (existingItem)
			throw new ConflictException("This Category already exist");

		return await this.menuItemModel.create(createDto);
	}

	async findAll() {
		return await this.menuItemModel.find().exec();
	}

	async findOne(id: string) {
		return await this.menuItemModel.findById(id).exec();
	}

	async update(id: string, updateDto: UpdateMenuItemDto) {
		return await this.menuItemModel
			.findByIdAndUpdate(id, updateDto, { new: true })
			.exec();
	}

	async remove(id: string) {
		return await this.menuItemModel.findByIdAndDelete(id).exec();
	}

	async countSnacks() {
		return await this.menuItemModel.countDocuments();
	}
}
