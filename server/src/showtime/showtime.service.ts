import {
	ConflictException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateShowtimeDto } from "./dtos/createShowtime.dto";
import { Showtime } from "./showtime.entity";
import { UpdateShowtimeDto } from "./dtos/updateShowtime.dto";

@Injectable()
export class ShowtimeService {
	constructor(
		@InjectModel(Showtime.name)
		private showtimeModel: Model<Showtime>
	) {}

	public async getShowtimeByMovieToAdmin(movieId: string) {
		const showtime = await this.showtimeModel
			.findOne({
				movie: movieId,
			})
			.populate({ path: "movie", select: "title" })
			.populate({ path: "theater", select: "number" });

		if (!showtime) throw new NotFoundException("Movie has no showtime");

		return showtime;
	}

	public async getShowtimeByMovie(movieId: string) {
		const showtime = await this.showtimeModel.findOne({
			movie: movieId,
		});

		if (!showtime) throw new NotFoundException("Movie has no showtime");

		return showtime;
	}

	public async createShowtime(createShowtimeDto: CreateShowtimeDto) {
		const existingShowtime = await this.showtimeModel.findOne({
			movie: createShowtimeDto.movie,
			theater: createShowtimeDto.theater,
			startTime: createShowtimeDto.startTime,
			date: createShowtimeDto.date,
		});

		if (existingShowtime) throw new ConflictException("Showtime already exist");

		const newShowtime = new this.showtimeModel(createShowtimeDto);

		return await newShowtime.save();
	}

	public async updateShowtime(updateShowtimeDto: UpdateShowtimeDto) {
		const showtime = await this.showtimeModel.findOneAndUpdate(
			{
				_id: updateShowtimeDto.id,
			},
			updateShowtimeDto,
			{ new: true }
		);
		if (!showtime) throw new NotFoundException("Showtime Not Found");

		return await showtime.save();
	}

	public async deleteShowtime(id: string) {
		const deletedShowtime = await this.showtimeModel.findByIdAndDelete(id);

		if (!deletedShowtime) throw new NotFoundException("Showtime Not Found");

		return deletedShowtime;
	}

	public async getShowtimeById(id: string) {
		const showtime = await this.showtimeModel
			.findById(id)
			.populate({ path: "movie", select: "title" })
			.populate({
				path: "theater",
				populate: { path: "seats" },
			});

		if (!showtime) throw new NotFoundException("Showtime Not Found");

		return showtime;
	}
}
