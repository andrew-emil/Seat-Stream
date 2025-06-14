import {
	Body,
	Controller,
	ForbiddenException,
	Get,
	HttpStatus,
	Patch
} from "@nestjs/common";
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from "@nestjs/swagger";
import { ActiveUser } from "src/auth/decorators/active-user.decorator";
import { Auth } from "src/auth/decorators/auth.decorator";
import { AuthType } from "src/auth/enums/authType.enum";
import { JwtPayload } from "src/auth/interfaces/jwt-payload";
import { UpdateUserDto } from "./dtos/updateUser.dto";
import { UserRole } from "./enums/userRole.enum";
import { UsersService } from "./users.service";

@ApiTags("Users")
@ApiBearerAuth()
@Controller("users")
@Auth(AuthType.BEARER)
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	@ApiOperation({ summary: "Get current user profile" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Returns the current user's profile information",
	})
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		description: "User is not authenticated",
	})
	public getUser(@ActiveUser() user: JwtPayload) {
		return this.usersService.findUser(user.sub);
	}

	@Patch()
	@ApiOperation({ summary: "Update current user profile" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "User profile has been successfully updated",
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: "Invalid input data",
	})
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		description: "User is not authenticated",
	})
	public updateUser(
		@Body() updateUserDto: UpdateUserDto,
		@ActiveUser() user: JwtPayload
	) {
		return this.usersService.updateUser(user.sub, updateUserDto);
	}

	@Get("count")
	@ApiOperation({ summary: "Get total number of users (Admin only)" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Returns the total number of users in the system",
	})
	@ApiResponse({
		status: HttpStatus.FORBIDDEN,
		description: "User is not authorized to access this resource",
	})
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		description: "User is not authenticated",
	})
	public getUsersCount(@ActiveUser() user: JwtPayload) {
		if (user.role !== UserRole.ADMIN) {
			throw new ForbiddenException(
				"You are not authorized to access this resource"
			);
		}
		return this.usersService.countUsers();
	}
}
