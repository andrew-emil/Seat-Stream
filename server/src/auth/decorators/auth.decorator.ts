import { SetMetadata } from "@nestjs/common";
import { AuthType } from "../enums/authType.enum";
import { AUTH_TYPE_KEY } from "../constants/auth.const";

export const Auth = (...args: AuthType[]) =>
	SetMetadata(AUTH_TYPE_KEY, args);
