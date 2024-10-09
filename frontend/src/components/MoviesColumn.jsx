import React from "react"
import "../css/pages/home.css"

const MoviesColumn = ({ movie }) => {
	const formattedDate = new Date(movie.release_date).toLocaleDateString(
		"en-US",
		{ year: "numeric", month: "long", day: "numeric" }
	);
	return (
		<div className="movie-card-section">
			<div className="movie-image">
				<img src={movie.poster} alt="" />
			</div>
			<div className="movie-details">
				<h3>{movie.title}</h3>
				<p>Release Date: {formattedDate}</p>
				<p>Director: {movie.director}</p>
				<p>Starring: {movie.starring}</p>
				<p>Language: {movie.language}</p>
				<br />
				<p>{movie.story}</p>
				<button>More Info</button>
			</div>
		</div>
	);
};

export default MoviesColumn;