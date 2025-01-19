import { Movie } from "@/utils/types";
import Link from "next/link";
import Image from "next/image";

import "@/app/home.css";

interface MoviesColumnProps {
	movie: Movie;
}

const MoviesColumn = ({ movie }: MoviesColumnProps) => {
	const formattedDate = new Date(movie.release_date).toLocaleDateString(
		"en-US",
		{ year: "numeric", month: "long", day: "numeric" }
	);

	return (
		<section className="movie-card-section">
			<div className="movie-image">
				<Image src={movie.poster} alt={movie.title} width={350}/>
			</div>
			<div className="movie-desc">
				<h3>{movie.title}</h3>
				<p>Release Date: {formattedDate}</p>
				<p>Genres: {movie.genres.join(", ")}</p>
				<p>Language: {movie.language}</p>
				<p>Starring: {movie.starring}</p>
				<p>Director: {movie.director}</p>
				<br />
				<p>{movie.story}</p>
				<Link
					href={{
						pathname: "/movieDetails",
						query: { ...movie },
					}}
					className="info-btn">
					More Info
				</Link>
			</div>
		</section>
	);
};

export default MoviesColumn;
