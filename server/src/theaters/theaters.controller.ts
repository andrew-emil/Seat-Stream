import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { TheatersService } from "./theaters.service";
import { CreateTheaterDto } from "./dto/create-theater.dto";
import { ActiveUser } from "src/auth/decorators/active-user.decorator";
import { JwtPayload } from "src/auth/interfaces/jwt-payload";
import { authorizeUser } from "src/common/utils/authorizeUser";
import { UserRole } from "src/users/enums/userRole.enum";
import { UpdateTheaterDto } from "./dto/update-theater.dto";

@Controller("theaters")
export class TheatersController {
	constructor(private readonly theaterService: TheatersService) {}

	@Post()
	public createTheater(
		@Body() createTheaterDto: CreateTheaterDto,
		@ActiveUser() user: JwtPayload
	) {
		authorizeUser(user, UserRole.ADMIN);

		return this.theaterService.createTheater(createTheaterDto);
	}
	@Patch()
	public updateTheater(
		@Body() updateTheaterDto: UpdateTheaterDto,
		@ActiveUser() user: JwtPayload
	) {
		authorizeUser(user, UserRole.ADMIN);

		return this.theaterService.updateTheater(updateTheaterDto);
	}

	@Delete("/:id")
	public deleteTheater(
		@Param("id") theaterId: string,
		@ActiveUser() user: JwtPayload
	) {
		authorizeUser(user, UserRole.ADMIN);

		return this.theaterService.deleteTheater(theaterId);
	}

	@Get("/:id")
	public getTheater(@Param("id") theaterId: string) {
		return this.theaterService.getTheater(theaterId);
	}
}
