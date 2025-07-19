import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Seat } from "src/seats/seat.entity";
import { Showtime } from "src/showtime/showtime.entity";

@Schema()
export class Ticket extends Document {
    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: Showtime.name
    })
    showtime: Showtime

    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: Seat.name
    })
    seat: Seat
}

export const TicketSchema = SchemaFactory.createForClass(Ticket)