import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AUTH_TYPE_KEY } from "../constants/auth.const";
import { AuthType } from "../enums/authType.enum";
import { AccessTokenGuard } from "./access-token.guard";

@Injectable()
export class AuthGuard implements CanActivate {
	private static readonly defaultAuthType = AuthType.BEARER;
	private readonly authTypeGuardMap: Record<
		AuthType,
		CanActivate | CanActivate[]
	>;

	constructor(
		private readonly accessTokenGuard: AccessTokenGuard,
		private readonly reflector: Reflector
	) {
		this.authTypeGuardMap = {
			[AuthType.BEARER]: this.accessTokenGuard,
			[AuthType.NONE]: {
				canActivate: () => true,
			},
		};
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const authTypes = this.reflector.getAllAndOverride<AuthType[]>(
			AUTH_TYPE_KEY,
			[context.getHandler(), context.getClass()]
		) ?? [AuthGuard.defaultAuthType];

		const guards = authTypes.map((type) => this.authTypeGuardMap[type]).flat();

		for (const guard of guards) {
			const canActivate = await Promise.resolve(
				guard.canActivate(context)
			).catch(() => {
				throw new UnauthorizedException();
			});

			if (canActivate) return true;
		}

		throw new UnauthorizedException();
	}
}
