import { Request, Response } from "express";
import { Model, ModelStatic } from "sequelize";

const getAllMovies = async (req: Request, res: Response) => {
	const moviesModel: ModelStatic<Model> = require("../../../models/movies.model");

	const moviesData = await moviesModel.findAll();

	if (!moviesData) throw "Error loading movies";

	res.status(200).json({
		status: "success",
		data: {
			moviesData,
		},
	});
};

module.exports = getAllMovies;