import { Request, Response } from "express";
import { Model, ModelStatic } from "sequelize";
import { addMovieSchema } from "../../../utils/validationSchemas";

const addMovie = async (req: Request, res: Response) => {
	const moviesModel: ModelStatic<Model> = require("../../../models/movies.model");
	const genresMovieModel: ModelStatic<Model> = require("../../../models/moviesGenres.model");

	try {
		const processedBody = {
			...req.body,
			genres: Array.isArray(req.body.genres)
				? req.body.genres.map((genre: string) => parseInt(genre, 10))
				: [],
			running_time: req.body.running_time
				? parseInt(req.body.running_time, 10)
				: undefined,
			now_showing: req.body.now_showing === "true",
		};

		const result = addMovieSchema.safeParse(processedBody);

		if (result.error || !result.success) throw result.error;

		if (!req.file) throw "File not found";

		const {
			title,
			story,
			trailer,
			genres,
			release_date,
			language,
			running_time,
			now_showing,
			starring,
			director,
		} = result.data;

		const poster = req.file.buffer;
		const addedMovie = await moviesModel.create(
			{
				title,
				story,
				trailer,
				language,
				release_date,
				poster,
				running_time,
				now_showing,
				starring,
				director,
			},
			{ returning: true, plain: true }
		);

		if (!addedMovie) throw "Error adding movie";

		await Promise.all(
			genres.map((genre) => {
				genresMovieModel.create({
					movieId: addedMovie.dataValues.movie_id,
					genreId: genre,
				});
			})
		);
		res.status(200).json({
			status: "success",
			message: "Movie added successfully",
		});
	} catch (err) {
		res.status(400).json({
			status: "error",
			message: err instanceof Error ? err.message : "An error occurred",
		});
	}
};

module.exports = addMovie;