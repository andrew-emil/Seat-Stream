const jwt = require("jsonwebtoken");

interface JWTHandlerProps {
	id: string;
	username: string;
	is_admin: boolean;
}

const jwtHandler = (user: JWTHandlerProps): string => {
	const accessToken: string = jwt.sign(
		{
			id: user.id,
			username: user.username,
			isAdmin: user.is_admin,
		},
		process.env.jwt_salt
	);

	return accessToken;
};

module.exports = jwtHandler;
