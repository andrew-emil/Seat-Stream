require("express-async-errors");
require("dotenv").config();

import express, { Application, Response } from "express";
import userRoutes from "./modules/users/users.routes";
import moviesRoutes from "./modules/movies/movies.routes";
import errorHandler from "./handlers/errorHandler";
import { sequelize } from "./config/db";

const cors = require("cors");
const cookieParser = require("cookie-parser");
const app: Application = express();
const port = process.env.PORT || 8000;

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);
app.use(
	cors({
		origin: "http://localhost:3000", // replace with your Next.js URL
		credentials: true, // allow cookies to be sent
	})
);

// Models initialization (assuming well-structured models)
require("./models/user.model");
require("./models/movies.model");
require("./models/genres.model.js");

// Routes
app.use("/api/users", userRoutes);
app.use("/api/movies", moviesRoutes);

// 404 handler
app.all("*", (_, res: Response) => {
	res.status(404).json({
		status: "failed",
		message: "404 Not Found :(",
	});
});

// Start the server
sequelize
	.sync()
	.then(() => {
		console.log("Database connected and synced successfully");
		app.listen(port, () => {
			console.log(`Server is running on port: ${port}`);
		});
	})
	.catch((err: any) => {
		console.error("Unable to connect to the database:", err);
	});
