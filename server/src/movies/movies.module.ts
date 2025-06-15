import { Module } from "@nestjs/common";
import { MoviesController } from "./movies.controller";
import { MoviesService } from "./movies.service";
import { Movie, MovieSchema } from "./movie.entity";
import { MongooseModule } from "@nestjs/mongoose";
import { RatingsModule } from "src/ratings/ratings.module";
import { PaginationModule } from "src/common/pagination/pagination.module";

@Module({
	controllers: [MoviesController],
	providers: [MoviesService],
	imports: [
		MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
		RatingsModule,
		PaginationModule
	],
})
export class MoviesModule {}
