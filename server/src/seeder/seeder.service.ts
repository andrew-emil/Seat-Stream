import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserRole } from "src/users/enums/userRole.enum";
import { User } from "src/users/user.entity";
import { BcryptProvider } from "src/auth/providers/bcrypt.provider";
import { UserSurname } from "src/users/enums/userSurname.enum";

@Injectable()
export class SeederService implements OnModuleInit {
	constructor(
		@InjectModel(User.name)
		private userModel: Model<User>,
		private readonly bcryptProvider: BcryptProvider
	) {}

	async onModuleInit() {
		await this.seed();
	}

	async seed() {
		try {
			await this.adminSeed();

			console.log("Database seeded successfully!");
		} catch (error) {
			console.error("Error seeding database:", error);
		}
	}

	private async adminSeed() {
		const existingAdmin = await this.userModel.findOne({
			role: UserRole.ADMIN,
		});
		if (existingAdmin) return;

		const hashedPassword = await this.bcryptProvider.hashPassword("admin123");

		const admin = new this.userModel({
			firstName: "Andrew",
			lastName: "Admin",
			email: "andrewemil343@gmail.com",
			role: UserRole.ADMIN,
			password: hashedPassword,
			surname: UserSurname.MR,
			phoneNumber: "+201204936350",
			birthDate: new Date("2004-08-17"),
		});

		await admin.save();
	}
}
