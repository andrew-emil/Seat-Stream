import { Genres } from "./types";

export const formatMovies = (movies: any[]) => {
	return movies.map((movie) => {
		const {
			movie_id,
			title,
			trailer,
			running_time,
			story,
			language,
			poster,
			release_date,
			now_showing,
			starring,
			director,
			MoviesGenres,
		} = movie.dataValues;

		return {
			movie_id,
			title,
			trailer,
			running_time,
			story,
			language,
			poster: `data:image/jpeg;base64,${Buffer.from(poster).toString(
				"base64"
			)}`,
			release_date,
			now_showing,
			starring,
			director,
			genres: [
				...new Set(MoviesGenres.map((genre: Genres) => genre.genre_name)),
			],
		};
	});
};
