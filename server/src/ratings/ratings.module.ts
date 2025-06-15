import { Module } from "@nestjs/common";
import { RatingsController } from "./ratings.controller";
import { RatingsService } from "./ratings.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Rating, RatingSchema } from "./rating.entity";

@Module({
	controllers: [RatingsController],
	providers: [RatingsService],
	exports: [RatingsService],
	imports: [
		MongooseModule.forFeature([
			{
				name: Rating.name,
				schema: RatingSchema,
			},
		]),
	],
})
export class RatingsModule {}
