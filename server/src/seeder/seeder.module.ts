import { Module } from "@nestjs/common";
import { SeederService } from "./seeder.service";
import { AuthModule } from "src/auth/auth.module";
import { UsersModule } from "src/users/users.module";

@Module({
	providers: [SeederService],
	imports: [AuthModule, UsersModule],
})
export class SeederModule {}
