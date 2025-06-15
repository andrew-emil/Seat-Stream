import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Theater } from './theater.entity';
import { ClientSession, Connection, Model } from 'mongoose';
import { SeatsService } from 'src/seats/seats.service';
import { CreateTheaterDto } from './dto/create-theater.dto';
import { UpdateTheaterDto } from './dto/update-theater.dto';
import { Seat } from 'src/seats/seat.entity';
import { DATABASE_CONNECTION } from './constants/databaseConnection';

@Injectable()
export class TheatersService {
    constructor(
        @InjectModel(Theater.name)
        private theaterModel: Model<Theater>,
        private readonly seatsService: SeatsService,
        @InjectModel(Seat.name)
        private seatModel: Model<Seat>,
        @InjectConnection(DATABASE_CONNECTION)
        private readonly connection: Connection
    ) {}

    public async createTheater(theater: CreateTheaterDto) {
        const session: ClientSession = await this.connection.startSession();
        session.startTransaction();

        try {
            const result = await session.withTransaction(async () => {
                const seats = await this.seatsService.createSeats(theater.seats);

                const createdTheater = await this.theaterModel.create({
                    ...theater,
                    seats: seats.map((seat) => seat._id)
                })

                return await createdTheater.save()
            })

            return result;
        } catch (error) {
            await session.abortTransaction();
            throw new InternalServerErrorException(error);
        } finally {
            await session.endSession();
        }
    }

    
}
