import {
	createParamDecorator,
	ExecutionContext,
	UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { REQUEST_USER_KEY } from "../constants/auth.const";
import { UserPayload } from "../interfaces/user.interface";

export const ActiveUser = createParamDecorator(
	(data: keyof UserPayload, ctx: ExecutionContext) => {
		const req: Request = ctx.switchToHttp().getRequest();
		const user = req[REQUEST_USER_KEY] as UserPayload;

		if (!user) throw new UnauthorizedException();

		return data ? user[data] : user;
	}
);
