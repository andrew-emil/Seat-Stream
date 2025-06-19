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
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiResponse,
	ApiTags,
} from "@nestjs/swagger";

@ApiTags("Theaters")
@ApiBearerAuth()
@Controller("theaters")
export class TheatersController {
	constructor(private readonly theaterService: TheatersService) {}

	@Post()
	@ApiOperation({ summary: "Create a new theater" })
	@ApiResponse({ status: 201, description: "Theater successfully created" })
	@ApiResponse({
		status: 403,
		description: "Forbidden - Admin access required",
	})
	public createTheater(
		@Body() createTheaterDto: CreateTheaterDto,
		@ActiveUser() user: JwtPayload
	) {
		authorizeUser(user);

		return this.theaterService.createTheater(createTheaterDto);
	}

	@Patch()
	@ApiOperation({ summary: "Update a theater" })
	@ApiResponse({ status: 200, description: "Theater successfully updated" })
	@ApiResponse({
		status: 403,
		description: "Forbidden - Admin access required",
	})
	@ApiResponse({ status: 404, description: "Theater not found" })
	public updateTheater(
		@Body() updateTheaterDto: UpdateTheaterDto,
		@ActiveUser() user: JwtPayload
	) {
		authorizeUser(user);

		return this.theaterService.updateTheater(updateTheaterDto);
	}

	@Delete("/:id")
	@ApiOperation({ summary: "Delete a theater" })
	@ApiParam({ name: "id", description: "Theater ID" })
	@ApiResponse({ status: 200, description: "Theater successfully deleted" })
	@ApiResponse({
		status: 403,
		description: "Forbidden - Admin access required",
	})
	@ApiResponse({ status: 404, description: "Theater not found" })
	public deleteTheater(
		@Param("id") theaterId: string,
		@ActiveUser() user: JwtPayload
	) {
		authorizeUser(user);

		return this.theaterService.deleteTheater(theaterId);
	}

	@Get("/:id")
	@ApiOperation({ summary: "Get a theater by ID" })
	@ApiParam({ name: "id", description: "Theater ID" })
	@ApiResponse({ status: 200, description: "Returns the theater details" })
	@ApiResponse({ status: 404, description: "Theater not found" })
	public getTheater(@Param("id") theaterId: string) {
		return this.theaterService.getTheater(theaterId);
	}

	@Get("/count-theaters")
	public countTheaters(@ActiveUser() user: JwtPayload) {
		authorizeUser(user);
		return this.theaterService.countTheaters();
	}
}
