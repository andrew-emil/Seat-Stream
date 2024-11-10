import { default as isEmail } from "validator/lib/isEmail";
import { Request, Response } from "express";
import { User } from "../../../utils/types";

const userModel = require("../../../models/user.model");
const bcrypt = require("bcrypt");
const jwtHandler = require("../../../handlers/jwtHandler");

const login = async (req: Request, res: Response): Promise<void> => {
	const { usernameOrEmail, password } = req.body;

	//validations...
	if (!usernameOrEmail || !password)
		throw "Please provide both username/email and password.";

	const user: User | null = await userModel.findOne({
		where: {
			[isEmail(usernameOrEmail) ? "email" : "username"]: usernameOrEmail,
		},
	});

	if (!user) throw "Wrong username/email or password";

	const comparedPassword: boolean = await bcrypt.compare(
		password,
		user.password
	);

	if (!comparedPassword) throw "Wrong username/email or password";

	const token = jwtHandler({
		id: user.id,
		username: user.username,
		is_admin: user.is_admin,
	});

	res.cookie("ACCESS-TOKEN", token, {// or 'none' if using secure: true in cross-site requests
		maxAge: 24 * 60 * 60 * 1000, // 1 day
	});


	res.status(200).json({
		status: "success",
		message: "User Logged in successfully",
	});
};

module.exports = login;
