import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { User, UserSchema } from "./user.entity";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/auth/auth.module";

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	exports: [
		UsersService,
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
	],
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		forwardRef(() => AuthModule),
	],
})
export class UsersModule {}
