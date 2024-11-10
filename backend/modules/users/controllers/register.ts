import { Request, Response } from "express";
import { User } from "../../../utils/types";
import { registerSchema } from "../../../utils/validationSchemas";

const bcrypt = require("bcrypt");
const jwtHandler = require("../../../handlers/jwtHandler");
const userModel = require("../../../models/user.model");

const register = async (req: Request, res: Response) => {
	const result = registerSchema.safeParse(req.body);

	if (result.error) throw result.error;

	const { username, email, password, phone_no } = result.data;

	const duplicatedEmail = await userModel.findOne({
		where: {
			email,
		},
		attributes: ["email"],
	});

	if (duplicatedEmail) throw "This Email already exists";

	const hashedPassword = await bcrypt.hash(password, 12);

	try {
		const createdUser: User = await userModel.create({
			username,
			password: hashedPassword,
			email,
			phone_no,
		});

		const token = jwtHandler({
			id: createdUser.id,
			username: createdUser.username,
			is_admin: createdUser.is_admin,
		});

		res.cookie("ACCESS-TOKEN", token, {
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax", // or 'none' if using secure: true in cross-site requests
			maxAge: 24 * 60 * 60 * 1000, // 1 day
		});

		res
			.status(201)
			.json({
				status: "success",
				message: "User created successfully",
			});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err instanceof Error ? err.message : "An error occurred",
		});
	}
};

module.exports = register;
