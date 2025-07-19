import {
	CanActivate,
	ExecutionContext,
	Inject,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import jwtConfig from "src/config/jwt.config";
import { REQUEST_USER_KEY } from "../constants/auth.const";
import { JwtPayload } from "../interfaces/jwt-payload";

@Injectable()
export class AccessTokenGuard implements CanActivate {
	constructor(
		private readonly jwtService: JwtService,
		@Inject(jwtConfig.KEY)
		private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req: Request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(req);

		const payload: JwtPayload = await this.jwtService.verifyAsync(
			token,
			this.jwtConfiguration
		);

		req[REQUEST_USER_KEY] = payload;

		return true;
	}

	private extractTokenFromHeader(request: Request): string {
		const [, token] = request.headers.authorization?.split(" ") ?? [];
		if (!token) throw new UnauthorizedException();

		return token;
	}
}
