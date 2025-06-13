import { registerAs } from "@nestjs/config";
import * as joi from "joi";

export const jwtSchema = {
	JWT_SECRET: joi.string().required(),
	JWT_ACCESS_TOKEN_TTL: joi.string().default("30"),
	JWT_TOKEN_AUDIENCE: joi.string().required(),
	JWT_TOKEN_ISSUER: joi.string().required(),
	GOOGLE_CLIENT_ID: joi.string().required(),
	GOOGLE_CLIENT_SECRET: joi.string().required(),
};

export default registerAs("jwt", () => {
	const config = {
		secret: process.env.JWT_SECRET,
		expiresIn:
			1000 *
			60 *
			60 *
			24 *
			parseInt(process.env.JWT_ACCESS_TOKEN_TTL ?? "30", 10),
		audience: process.env.JWT_TOKEN_AUDIENCE,
		issuer: process.env.JWT_TOKEN_ISSUER,
		googleClientId: process.env.GOOGLE_CLIENT_ID,
		googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
	};

	// Only validate the specific environment variables we care about
	const envVars = {
		JWT_SECRET: process.env.JWT_SECRET,
		JWT_ACCESS_TOKEN_TTL: process.env.JWT_ACCESS_TOKEN_TTL,
		JWT_TOKEN_AUDIENCE: process.env.JWT_TOKEN_AUDIENCE,
		JWT_TOKEN_ISSUER: process.env.JWT_TOKEN_ISSUER,
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
	};

	const { error } = joi
		.object(jwtSchema)
		.validate(envVars, { abortEarly: false });
	if (error) {
		throw new Error(`JWT configuration validation error: ${error.message}`);
	}

	return config;
});

export const jwtConfig = {
	secret: process.env.JWT_SECRET,
	signOptions: {
		expiresIn:
			1000 *
			60 *
			60 *
			24 *
			parseInt(process.env.JWT_ACCESS_TOKEN_TTL ?? "30", 10),
		audience: process.env.JWT_TOKEN_AUDIENCE,
		issuer: process.env.JWT_TOKEN_ISSUER,
	},
};
