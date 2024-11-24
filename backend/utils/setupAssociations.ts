import { Model, ModelStatic } from "sequelize";

export const setupAssociations = (
	moviesModel: ModelStatic<Model>,
	genresModel: ModelStatic<Model>,
	MovieGenre: ModelStatic<Model>
) => {
	if (!moviesModel.associations.MoviesGenres) {
		moviesModel.belongsToMany(genresModel, {
			through: MovieGenre,
			as: "MoviesGenres",
			foreignKey: "movie_id",
		});
	}

	if (!genresModel.associations.GenresMovies) {
		genresModel.belongsToMany(moviesModel, {
			through: MovieGenre,
			as: "GenresMovies",
			foreignKey: "genre_id",
		});
	}
};
