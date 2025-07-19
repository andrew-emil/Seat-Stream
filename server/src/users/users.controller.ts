import { Body, Controller, Get, HttpStatus, Patch } from "@nestjs/common";
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from "@nestjs/swagger";
import { ActiveUser } from "src/auth/decorators/active-user.decorator";
import { JwtPayload } from "src/auth/interfaces/jwt-payload";
import { authorizeUser } from "src/common/utils/authorizeUser";
import { UpdateUserDto } from "./dtos/updateUser.dto";
import { UsersService } from "./users.service";

@ApiTags("Users")
@ApiBearerAuth()
@Controller("users")
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
	public async getUser(@ActiveUser() user: JwtPayload) {
		return await this.usersService.findUser(user.sub);
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
	public async updateUser(
		@Body() updateUserDto: UpdateUserDto,
		@ActiveUser() user: JwtPayload
	) {
		return await this.usersService.updateUser(user.sub, updateUserDto);
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
	public async getUsersCount(@ActiveUser() user: JwtPayload) {
		authorizeUser(user);
		return await this.usersService.countUsers();
	}
}
