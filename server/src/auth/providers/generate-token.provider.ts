import { Inject, Injectable } from "@nestjs/common";
import jwtConfig from "src/config/jwt.config";
import { JwtService } from "@nestjs/jwt";
import { ConfigType } from "@nestjs/config";
import { User } from "src/users/user.entity";

@Injectable()
export class GenerateTokenProvider {
	constructor(
		private readonly jwtService: JwtService,
		@Inject(jwtConfig.KEY)
		private jwtConfiguration: ConfigType<typeof jwtConfig>
	) {}

	private async signToken<T>(userId: string, expiresIn: number, payload?: T) {
		return await this.jwtService.signAsync(
			{
				sub: userId,
				...payload,
			},
			{
				secret: this.jwtConfiguration.secret,
				audience: this.jwtConfiguration.audience,
				issuer: this.jwtConfiguration.issuer,
				expiresIn,
			}
		);
	}

	public async generateAccessToken(user: User) {
		const accessToken = await this.signToken<Partial<User>>(
			user._id as string,
			this.jwtConfiguration.expiresIn,
			{ email: user.email, role: user.role }
		);

		return accessToken;
	}
}
