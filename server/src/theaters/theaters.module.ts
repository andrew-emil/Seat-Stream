import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SeatsModule } from "src/seats/seats.module";
import { Theater, TheaterSchema } from "./theater.entity";
import { TheatersController } from "./theaters.controller";
import { TheatersService } from "./theaters.service";

@Module({
	controllers: [TheatersController],
	providers: [
		TheatersService,
	],
	imports: [
		MongooseModule.forFeature([
			{
				name: Theater.name,
				schema: TheaterSchema,
			},
		]),
		SeatsModule,
	],
})
export class TheatersModule {}
