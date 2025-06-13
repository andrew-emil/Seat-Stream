import { forwardRef, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { BcryptProvider } from "./providers/bcrypt.provider";
import { GenerateTokenProvider } from "./providers/generate-token.provider";
import { UsersModule } from "src/users/users.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import jwtConfig from "src/config/jwt.config";
import { JwtModule } from "@nestjs/jwt";

@Module({
	controllers: [AuthController],
	providers: [AuthService, BcryptProvider, GenerateTokenProvider],
	exports: [BcryptProvider, GenerateTokenProvider, JwtModule],
	imports: [
		forwardRef(() => UsersModule),
		ConfigModule.forFeature(jwtConfig),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get<string>("jwt.secret"),
				expiresIn: configService.get<number>("jwt.expiresIn"),
				audience: configService.get<string>("jwt.audience"),
				issuer: configService.get<string>("jwt.issuer"),
			}),
			inject: [ConfigService],
		}),
	],
})
export class AuthModule {}
