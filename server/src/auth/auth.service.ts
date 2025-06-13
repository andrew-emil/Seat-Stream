import {
	BadRequestException,
	forwardRef,
	Inject,
	Injectable,
	OnModuleInit,
	UnauthorizedException,
} from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { OAuth2Client } from "google-auth-library";
import jwtConfig from "src/config/jwt.config";
import { UsersService } from "src/users/users.service";
import { GoogleTokenDto } from "./dtos/googleToken.dto";
import { LoginDto } from "./dtos/login.dto";
import { BcryptProvider } from "./providers/bcrypt.provider";
import { GenerateTokenProvider } from "./providers/generate-token.provider";
import { CreateUserDto } from "src/users/dtos/createUser.dto";

@Injectable()
export class AuthService implements OnModuleInit {
	private oAuthClient: OAuth2Client;
	constructor(
		@Inject(forwardRef(() => UsersService))
		private readonly usersService: UsersService,
		private readonly bcryptProvider: BcryptProvider,
		private readonly generateTokenProvider: GenerateTokenProvider,
		@Inject(jwtConfig.KEY)
		private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
	) {}
	onModuleInit() {
		this.oAuthClient = new OAuth2Client(
			this.jwtConfiguration.googleClientId,
			this.jwtConfiguration.googleClientSecret
		);
	}

	public async login(loginDto: LoginDto) {
		const user = await this.usersService.findUserByEmail(loginDto.email);

		const isPasswordValid = await this.bcryptProvider.comparePassword(
			loginDto.password,
			user.password ?? ""
		);

		if (!isPasswordValid)
			throw new BadRequestException("Invalid Email or password");

		const accessToken = await this.generateTokenProvider.generateAccessToken(
			user
		);

		return {
			accessToken,
		};
	}

	public async googleLogin(googleTokenDto: GoogleTokenDto) {
		const loginTicket = await this.oAuthClient.verifyIdToken({
			idToken: googleTokenDto.token,
		});

		const payload = loginTicket.getPayload();

		if (!payload) throw new BadRequestException("Invalid Google Token");

		const {
			email,
			sub: googleId,
			given_name: firstName,
			family_name: lastName,
		} = payload;

		const user = await this.usersService.findUserByGoogleId(googleId);

		if (user) {
			return await this.generateTokenProvider.generateAccessToken(user);
		}
		try {
			const newUser = await this.usersService.createUser({
				email: email ?? "",
				firstName: firstName ?? "",
				lastName: lastName ?? "",
				googleId,
			});
			return await this.generateTokenProvider.generateAccessToken(newUser);
		} catch (err) {
			throw new UnauthorizedException(err, {
				description: "Could not create user with google",
			});
		}
	}

	public async register(createUserDto: CreateUserDto) {
		const user = await this.usersService.createUser(createUserDto);

		return await this.generateTokenProvider.generateAccessToken(user);
	}
}
