import { registerAs } from "@nestjs/config";
import * as joi from "joi";

export default registerAs("database", () => ({
	host: process.env.DB_HOST,
	databaseName: process.env.DB_NAME,
}));

export const databaseSchema = {
	DB_HOST: joi.string().required(),
	DB_NAME: joi.string().required(),
};
