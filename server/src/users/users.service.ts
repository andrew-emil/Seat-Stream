import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BcryptProvider } from "src/auth/providers/bcrypt.provider";
import { CreateUserDto } from "./dtos/createUser.dto";
import { UpdateUserDto } from "./dtos/updateUser.dto";
import { UserRole } from "./enums/userRole.enum";
import { User } from "./user.entity";
import { plainToInstance } from "class-transformer";
import { UserResponseDto } from "./dtos/userResponse.dto";

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name)
		private userModel: Model<User>,
		private readonly bcryptProvider: BcryptProvider
	) {}

	public async createUser(createUserDto: CreateUserDto) {
		const existingUser = await this.userModel.findOne({
			$or: [
				{ email: createUserDto.email },
				{ phoneNumber: createUserDto.phoneNumber },
			],
		});

		if (existingUser) throw new BadRequestException("User already exists");

		let hashedPassword: string = "";

		if (createUserDto.password) {
			hashedPassword = await this.bcryptProvider.hashPassword(
				createUserDto.password
			);
		}

		const newUser = new this.userModel({
			...createUserDto,
			password: hashedPassword,
		});

		const savedUser = await newUser.save();
		return savedUser;
	}

	public async findUser(id: string) {
		const user = await this.userModel
			.findById(id)
			.select([
				"firstName",
				"lastName",
				"email",
				"phoneNumber",
				"surname",
				"birthDate",
			]);
		if (!user) throw new NotFoundException("User not found");
		return plainToInstance(UserResponseDto, user.toObject());
	}

	public async updateUser(id: string, updateUserDto: UpdateUserDto) {
		const user = await this.userModel
			.findById(id)
			
		if (!user) throw new NotFoundException("User not found");

		Object.assign(user, updateUserDto);
		const updatedUser = await user.save();
		return plainToInstance(UserResponseDto, updatedUser.toObject());
	}

	public async findUserByGoogleId(googleId: string) {
		const user = await this.userModel.findOne({ googleId });
		return user;
	}

	public async findUserByEmail(email: string) {
		const user = await this.userModel.findOne({ email });
		if (!user) throw new NotFoundException("User not found");
		return user;
	}

	public async countUsers() {
		return await this.userModel.countDocuments({
			role: UserRole.USER,
		});
	}
}
