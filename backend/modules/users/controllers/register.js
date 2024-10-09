require("../../../handlers/jwtHandler");
const bcrypt = require("bcrypt");
const jwtHandler = require("../../../handlers/jwtHandler");

const register = async (req, res) => {
	const userModel = require("../../../models/user.model");

	const { username, email, phone, password, confirmPass } = req.body;

	//validations...
	if (!username) throw "name must be provided";

	if (!email) throw "Email must be provided";

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (!emailRegex.test(email)) throw "Please enter a valid Email address";

	if (!password) throw "password must be provided";

	if (password.length < 5) throw "password must be 5 characters long";

	if (!confirmPass) throw "confirm Password must be provided";

	if (password !== confirmPass)
		throw "password and confirm password does not match";

	if (!phone) throw "phone number must be provided";

	if (phone.length < 8) throw "Please enter a valid phone number";

	const duplicatedEmail = await userModel.findOne({
		where: {
			email,
		},
		attributes: ["email"],
	});

	if (duplicatedEmail) throw "This Email already exists";

	const hashedPassword = await bcrypt.hash(password, 12);

	try {
		const createdUser = await userModel.create({
			username,
			password: hashedPassword,
			email,
			phone_no: phone,
		});

		const accessToken = jwtHandler(createdUser);

		res.status(201).json({
			status: "success",
			message: "User created successfully",
			accessToken,
		});
	} catch (err) {
		res.status(400).json({
			status: "failed",
			message: err.message,
		});
	}
};

module.exports = register;
