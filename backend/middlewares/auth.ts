import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "../utils/types";
import * as jwt from "jsonwebtoken";

interface CustomRequest extends Request {
	user: JwtPayload;
}

export const authUser = (req: Request, res: Response, next: NextFunction) => {
	const token =
		req.cookies['ACCESS-TOKEN'] || req.headers.authorization?.split(" ")[1];
		// console.log(token);
	if (!token) {
		res.status(401).json({
			message: "Access Denied",
		});
		return;
	}

	try {
		const decodedToken = jwt.verify(
			token,
			process.env.jwt_salt as string
		) as JwtPayload;
		(req as CustomRequest).user = decodedToken;
		next();
	} catch (error) {
		res.status(401).json({ message: "Token is not valid" });
		return;
	}
};

export const authorizeRole = (is_admin: boolean) => {
	return (req: Request, res: Response, next: NextFunction): void => {

		if ((req as CustomRequest).user.isAdmin !== is_admin) {
			res.status(403).json({ message: "Access denied" });
            return;
		}
		next();
	};
};
