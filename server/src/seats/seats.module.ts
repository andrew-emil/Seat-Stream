import { Module } from "@nestjs/common";
import { SeatsService } from "./seats.service";
import { SeatsController } from "./seats.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Seat, SeatSchema } from "./seat.entity";

@Module({
	providers: [SeatsService],
	controllers: [SeatsController],
	imports: [
		MongooseModule.forFeature([
			{
				name: Seat.name,
				schema: SeatSchema,
			},
		]),
	],
	exports: [
		SeatsService,
		MongooseModule.forFeature([
			{
				name: Seat.name,
				schema: SeatSchema,
			},
		]),
	],
})
export class SeatsModule {}
