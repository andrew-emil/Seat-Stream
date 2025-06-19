import { Module } from "@nestjs/common";
import { ShowtimeService } from "./showtime.service";
import { ShowtimeController } from "./showtime.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Showtime, showtimeSchema } from "./showtime.entity";

@Module({
	providers: [ShowtimeService],
	controllers: [ShowtimeController],
	imports: [
		MongooseModule.forFeature([
			{
				name: Showtime.name,
				schema: showtimeSchema,
			},
		]),
	],
})
export class ShowtimeModule {}
