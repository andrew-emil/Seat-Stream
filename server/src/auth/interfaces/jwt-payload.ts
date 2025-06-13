import { UserRole } from "src/users/enums/userRole.enum";

export interface JwtPayload {
	sub: string;
	email: string;
	role: UserRole;
	iat: number;
	exp: number;
	iss: string;
	aud: string;
}
