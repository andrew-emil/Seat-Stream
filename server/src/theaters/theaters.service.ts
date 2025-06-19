import {
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import mongoose, { ClientSession, Model } from "mongoose";
import { SeatsService } from "src/seats/seats.service";
import { CreateTheaterDto } from "./dto/create-theater.dto";
import { UpdateTheaterDto } from "./dto/update-theater.dto";
import { Theater } from "./theater.entity";

@Injectable()
export class TheatersService {
	constructor(
		@InjectModel(Theater.name)
		private theaterModel: Model<Theater>,
		private readonly seatsService: SeatsService,
		@InjectConnection()
		private readonly connection: mongoose.Connection
	) {}

	public async createTheater(theater: CreateTheaterDto) {
		const session: ClientSession = await this.connection.startSession();

		try {
			const result = await session.withTransaction(async () => {
				const seats = await this.seatsService.createSeats(theater.seats);

				const createdTheater = await this.theaterModel.create({
					...theater,
					seats: seats.map((seat) => seat._id),
				});

				return await createdTheater.save();
			});

			return result;
		} catch (error) {
			console.log(error);
			await session.abortTransaction();
			throw new InternalServerErrorException(error);
		} finally {
			await session.endSession();
		}
	}

	public async updateTheater(updateTheaterDto: UpdateTheaterDto) {
		const { theaterId, ...updateData } = updateTheaterDto;
		try {
			const theater = await this.theaterModel.findOneAndUpdate(
				{
					_id: theaterId,
				},
				updateData
			);
			return theater;
		} catch (error) {
			console.log(error);
			throw new InternalServerErrorException(error);
		}
	}

	public async deleteTheater(theaterId: string) {
		const session: ClientSession = await this.connection.startSession();

		try {
			await session.withTransaction(async () => {
				const theater = await this.theaterModel.findById(theaterId);
				if (!theater) throw new NotFoundException("Theater don't exist");

				const seatIds = theater.seats.map((seat) => seat._id as string);

				await Promise.all([
					this.seatsService.deleteSeats(seatIds),
					this.theaterModel.findByIdAndDelete(theaterId),
				]);
			});
			return true;
		} catch (error) {
			console.log(error);
			throw new InternalServerErrorException(error);
		} finally {
			await session.endSession();
		}
	}

	public async getTheater(theaterId: string) {
		const theater = await this.theaterModel
			.findById(theaterId)
			.populate("seats");

		if (!theater) throw new NotFoundException("This Theater don't exist");

		return theater;
	}

	public async countTheaters(): Promise<number>{
		return await this.theaterModel.countDocuments()
	}
}
