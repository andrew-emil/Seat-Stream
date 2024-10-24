import Carousel from "@/components/home/Carousel";
import MoviePoster from "@/components/home/MoviePoster";
import { Movie } from "@/utils/types";
import Link from "next/link";
import MoviesColumn from "@/components/home/MoviesColumn";

import "./home.css";

const movies: Movie[] = [];

const HomePage = () => {
	// TODO: call api function
	return (
		<main className="home-page-container">
			<>
				<div className="first-section">{/* <Carousel movie={movies} /> */}</div>
				<br />
				<div className="second-section">
					<div className="section-title">
						<span>What's on</span>
					</div>
					<br />
					<div className="grid-container">
						<div className="movie-grid">
							{movies.map((movie, index) => (
								// <MoviePoster key={movie.movie_id} movie={movies[index]}/>
								<div></div>
							))}
						</div>
						{/*TODO: add the correct href*/}
						<Link className="view-all-movies-btn" href="/">
							View all movies
						</Link>
						<hr className="dashed" />
					</div>
				</div>
				<div className="upcoming-movies">
					<div className="section-title coming.soon">
						<span>Coming soon</span>
					</div>
					<div className="coming-soon-movies">
						{movies.map((movie, index) => (
							<>
								//* only five movies
								{/* <MoviesColumn movie={movie[index]} /> */}
								{index < 4 && index < movies.length - 1 && (
									<hr className="dashed" />
								)}
							</>
						))}
					</div>
				</div>
			</>
		</main>
	);
};

export default HomePage;
