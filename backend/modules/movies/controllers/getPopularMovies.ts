import { Request, Response } from "express";
import { moviesModel, genresModel } from "../../../models/modelsSetup";
import { formatMovies } from "../../../utils/formatMovies";

const getPopularMovies = async (_: Request, res: Response) => {
	try {
		const [nowShowingMovies, comingSoonMovies] = await Promise.all([
			moviesModel.findAll({
				where: {
					now_showing: true,
				},
				limit: 10,
				include: [
					{
						model: genresModel,
						as: "MoviesGenres",
						attributes: ["genre_name"],
						through: { attributes: [] },
					},
				],
			}),
			moviesModel.findAll({
				where: {
					now_showing: false,
				},
				limit: 5,
				include: [
					{
						model: genresModel,
						as: "MoviesGenres",
						attributes: ["genre_name"],
						through: { attributes: [] },
					},
				],
			}),
		]);

		if (!nowShowingMovies || !comingSoonMovies) throw "No movies found";

		const formattedNowShowing = formatMovies(nowShowingMovies);
		const formattedComingSoon = formatMovies(comingSoonMovies);

		res.status(200).json({
			status: "success",
			nowShowing: formattedNowShowing,
			comingSoon: formattedComingSoon,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

module.exports = getPopularMovies;
