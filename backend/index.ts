require("express-async-errors");
require("dotenv").config();

import express, { Application, Response } from "express";
import mysql2 from "mysql2/promise";
import userRoutes from "./modules/users/users.routes";
import moviesRoutes from "./modules/movies/movies.routes";
import errorHandler from "./handlers/errorHandler";

const cors = require("cors");
const cookieParser = require("cookie-parser");

const username = process.env.DB_USER as string;
const hostName = process.env.HOST as string;
const port = (process.env.PORT ?? 8000) as number;
const database = process.env.DATABASENAME as string;

async function connectToDatabase(): Promise<mysql2.Pool> {
	try {
		const connection = mysql2.createPool({
			host: hostName,
			user: username,
			password: "",
			database: database,
		});
		await connection.query("SELECT 1 + 1 AS result");
		console.log("Connected to database");
		return connection;
	} catch (err) {
		console.error("Error connecting to database:", err);
		throw err;
	}
}

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);
app.use(cors({
  origin: 'http://localhost:3000',  // replace with your Next.js URL
  credentials: true                 // allow cookies to be sent
}));

(async () => {
	await connectToDatabase();
})();

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
app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});

// Models initialization (assuming well-structured models)
require("./models/user.model");
require("./models/movies.model");

// app.post("/api/addfood",async (req, res) => {
// 	const foodModel = require("./models/food.model");

// 	const {category_id, name, price, photo} = req.body

// 	try{
// 		await foodModel.create({
// 			category_id,
// 			name,
// 			price,
// 			photo
// 		})
// 		res.status(200).json({
// 			status: 'success',
// 		})
// 	}catch(err){
// 		res.status(400).json({message: err.message});
// 	}
// })
