import { default as isEmail } from "validator/lib/isEmail";
import { Request, Response } from "express";
import { User } from "../../../utils/types";

const bcrypt = require("bcrypt");
const jwtHandler = require("../../../handlers/jwtHandler");

const login = async (req: Request, res: Response): Promise<void> => {
	const userModel = require("../../../models/user.model.js")
	const { usernameOrEmail, password } = req.body;

	try {
		// Validations
		if (!usernameOrEmail || !password) {
			res
				.status(400)
				.json({ error: "Please provide both username/email and password." });
		}

		const user: User | null = await userModel.findOne({
			where: {
				[isEmail(usernameOrEmail) ? "email" : "username"]: usernameOrEmail,
			},
		});

		if (!user) {
			res
				.status(401)
				.json({ error: "Wrong username/email or password" });
		}

		const comparedPassword: boolean = await bcrypt.compare(
			password,
			user!.password
		);

		if (!comparedPassword) {
			res
				.status(401)
				.json({ error: "Wrong username/email or password" });
		}

		const token = jwtHandler({
			id: user!.id,
			username: user!.username,
			is_admin: user!.is_admin,
		});

		res.cookie("ACCESS-TOKEN", token, {
			maxAge: 24 * 60 * 60 * 1000, // 1 day
			httpOnly: true,
		});

		res.status(200).json({
			status: "success",
			message: "User Logged in successfully",
		});
	} catch (error) {
		console.error("Login Error:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

module.exports = login;
