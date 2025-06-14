import { Module } from "@nestjs/common";
import { GenresController } from "./genres.controller";
import { GenresService } from "./genres.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Genre, GenreSchema } from "./genre.entity";
import { PaginationModule } from "src/common/pagination/pagination.module";

@Module({
	controllers: [GenresController],
	providers: [GenresService],
	imports: [
		MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }]),
		PaginationModule,
	],
})
export class GenresModule {}
