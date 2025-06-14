import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Genre } from "./genre.entity";
import { Model } from "mongoose";
import { GenreQueryDto } from "./dtos/genreQuery.dto";
import { PaginationService } from "src/common/pagination/pagination.service";

@Injectable()
export class GenresService {
	constructor(
		@InjectModel(Genre.name) private genreModel: Model<Genre>,
		private readonly paginationService: PaginationService
	) {}

	public async createGenre(name: string) {
		const existingGenre = await this.genreModel.findOne({ name });
		if (existingGenre) throw new ConflictException("Genre already exists");

		const genre = new this.genreModel({ name });
		return genre.save();
	}

	public async getGenres(query: GenreQueryDto) {
		return await this.paginationService.paginate<Genre>(this.genreModel, {
			page: parseInt(query.page ?? "1"),
			limit: parseInt(query.limit ?? "10"),
			sort: {
				name: query.sort === "asc" ? 1 : -1,
			},
		});
	}

    public async getGenresWithoutPagination() {
        return await this.genreModel.find().sort({ name: 1 });
    }

    public async updateGenre(id: string, name: string) {
        const genre = await this.genreModel.findByIdAndUpdate(id, { name });
        if (!genre) throw new NotFoundException("Genre not found");
        return genre;
    }

    public async deleteGenre(id: string) {
        const genre = await this.genreModel.findByIdAndDelete(id);
        if (!genre) throw new NotFoundException("Genre not found");
        return true;
    }
}
