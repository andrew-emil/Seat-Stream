import { Module } from "@nestjs/common";
import { TheatersController } from "./theaters.controller";
import { TheatersService } from "./theaters.service";
import { MongooseModule, getConnectionToken } from "@nestjs/mongoose";
import { Theater, TheaterSchema } from "./theater.entity";
import { SeatsModule } from "src/seats/seats.module";
import { Connection } from "mongoose";
import { DATABASE_CONNECTION } from "./constants/databaseConnection";

@Module({
	controllers: [TheatersController],
	providers: [
		TheatersService,
		{
			provide: DATABASE_CONNECTION,
			useFactory: (connection: Connection) =>
				connection.model(Theater.name, TheaterSchema),
			inject: [getConnectionToken()],
		},
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
