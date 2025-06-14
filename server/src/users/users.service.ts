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
			.findOne({ _id: id })
			.select([
				"firstName",
				"lastName",
				"email",
				"phoneNumber",
				"surname",
				"birthDate",
			]);
		if (!user) throw new NotFoundException("User not found");

		return user;
	}

	public async updateUser(id: string, updateUserDto: UpdateUserDto) {
		const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
			projection: {
				password: 0,
				googleId: 0,
			},
		});

		if (!user) throw new NotFoundException("User not found");

		return user.save();
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
