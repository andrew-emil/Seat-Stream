const jwt = require("jsonwebtoken");

const jwtHandler = (user) => {
	const accessToken = jwt.sign(
		{
			id: user.id,
			username: user.username,
		},
		process.env.jwt_salt
	);
	return accessToken;
};

module.exports = jwtHandler