require("../../../handlers/jwtHandler");
const bcrypt = require("bcrypt");
const jwtHandler = require("../../../handlers/jwtHandler");
const { default: isEmail } = require("validator/lib/isEmail");

const login = async (req, res) => {
	const userModel = require("../../../models/user.model");

	const { usernameOrEmail, password } = req.body;

	//validations...
    if (!usernameOrEmail || !password) 
		throw "Please provide both username/email and password."

	const isUsername = !isEmail(usernameOrEmail);

	let user = null;

	if (isUsername) {
		user = await userModel.findOne({
			where: {
				username: usernameOrEmail,
			},
			attributes: ["username", "password"],
		});
	} else {
		user = await userModel.findOne({
			where: {
				email: usernameOrEmail,
			},
			attributes: ["email", "password"],
		});
	}

	if (!user) throw "Wrong username/email or password";

	const comparedPassword = await bcrypt.compare(password, user.password);

	if (!comparedPassword) throw "Wrong username/email or password";

	const jwt = jwtHandler(user);

	res.status(200).json({
		status: "success",
		message: "User Logged in successfully",
		accessToken: jwt,
	});
};

module.exports = login;
