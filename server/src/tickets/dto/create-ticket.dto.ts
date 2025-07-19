import { IsMongoId, IsNotEmpty } from "class-validator";

export class CreateTicketDto {
	@IsMongoId()
	@IsNotEmpty()
	showtime: string;

	@IsMongoId()
	@IsNotEmpty()
	seat: string;
}
