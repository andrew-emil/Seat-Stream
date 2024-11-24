import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { z } from "zod";

const errorHandler: ErrorRequestHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	if (err) {
		if (err.message) {
			res.status(400).json({
				status: "error",
				error: err.message,
			});
		} else if (err instanceof z.ZodError) {
			res.status(400).json({
				status: "error",
				error: err.message
			});
		} else {
			res.status(400).json({
				status: "error",
				error: err,
			});
		}
	}

	next();
};

export default errorHandler;
