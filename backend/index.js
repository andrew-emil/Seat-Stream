require("express-async-errors")

const express = require("express");
const mysql = require("mysql2");
const errorHandler = require("./handlers/errorHandler");
const userRoutes = require("./modules/users/users.routes");
const cors = require("cors");
const moviesRoutes = require("./modules/movies/movies.routes");
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "cinema",
});

connection.connect((err) => {
	if (err) {
		console.log(err);
		return;
	}
	return;
});

app.listen(8000, (req, res) => {
	console.log(`Listening on port: 8000`);
});

//models init...
require("./models/user.model");
require("./models/movies.model")

//routes..
app.use("/api/users", userRoutes);
app.use("/api/movies", moviesRoutes);
app.post("/api/addfood",async (req, res) => {
	const foodModel = require("./models/food.model");

	const {category_id, name, price, photo} = req.body

	try{
		await foodModel.create({
			category_id,
			name,
			price,
			photo
		})
		res.status(200).json({
			status: 'success',
		})
	}catch(err){
		res.status(400).json({message: err.message});
	}
})


//middlewares...
app.use('/uploads', express.static('uploads'));


//end of routes...
app.all("*", (_, res) => {
	res.status(404).json({
		status: "failed",
		message: "404 Not Found :(",
	});
});

app.use(errorHandler);