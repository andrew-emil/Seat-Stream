import { JwtPayload } from "@/utils/types";
import * as jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const authintcateUser = async (): promise<JwtPayload | null> => {
	try {
		
		const cookieStore = await cookies();
  		const token =  cookieStore.get('ACCESS-TOKEN')?.value;

		if (!token) {
			console.warn("No token found in cookies");
			return null;
		}

		// Verify the token and parse the payload
		const userPayload = jwt.verify(
			token,
			process.env.jwt_salt as string
		) as JwtPayload;

		return userPayload;
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			console.error("Invalid or expired token:", error.message);
		} else {
			console.error("An error occurred during authentication:", error);
		}
		return null;
	}
};
