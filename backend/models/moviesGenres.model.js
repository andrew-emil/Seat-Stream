const { sequelize } = require("../config/db.ts");
const { DataTypes } = require("sequelize");
const moviesModel = require("./movies.model");
const genresModel = require("./genres.model");


const MovieGenre = sequelize.define("movies_genres", {
	movieId: {
		type: DataTypes.UUID,
		references: {
			model: moviesModel,
			key: "movie_id",
		},
		primaryKey: true,
	},
	genreId: {
		type: DataTypes.INTEGER,
		references: {
			model: genresModel,
			key: "genre_id",
		},
		primaryKey: true,
	}
}, {
	updatedAt: false,
	createdAt: false,
	underscored: true,
});

module.exports = MovieGenre;