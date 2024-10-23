import { Movie } from "@/utils/types";
import Link from "next/link";
import Image from "next/image";

import "@/app/home.css"

const MoviesColumn = (movie: Movie) => {
	const formattedDate = new Date(movie.release_date).toLocaleDateString(
		"en-US",
		{ year: "numeric", month: "long", day: "numeric" }
	);
	return (
		<div className="movie-card-section">
			<div className="movie-image">
				<Image src={movie.poster} alt={movie.title} />
			</div>
			<div className="movie-details">
				<h3>{movie.title}</h3>
				<p>Release Date: {formattedDate}</p>
				<p>Director: {movie.director}</p>
				<p>Starring: {movie.starring}</p>
				<p>Language: {movie.language}</p>
				<br />
				<p>{movie.story}</p>
				<Link href="/" className="info-btn">More Info</Link>
			</div>
		</div>
	);
};

export default MoviesColumn;
