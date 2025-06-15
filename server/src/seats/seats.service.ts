import { Injectable, NotFoundException } from "@nestjs/common";
import { Seat } from "./seat.entity";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateSeatDto } from "./dtos/createSeat.dto";

@Injectable()
export class SeatsService {
	constructor(
		@InjectModel(Seat.name)
		private seatModel: Model<Seat>
	) {}

	public async createSeats(seat: CreateSeatDto[]) {
		const seats = await this.seatModel.insertMany(seat);
		return seats;
	}

	public async getSeats(ids: string[]) {
		const seats = await this.seatModel.find({
			_id: {
				$in: ids,
			},
		});

		if (!seats || seats.length === 0) {
			throw new NotFoundException("Seats not found");
		}

		return seats;
	}

	public async bookSeats(ids: string[]) {
		return await this.seatModel.updateMany(
			{
				_id: { $in: ids },
			},
			{ $set: { is_available: false } }
		);
	}
}
