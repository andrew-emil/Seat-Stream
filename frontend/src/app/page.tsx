import Carousel from "@/components/home/Carousel";
import MoviePoster from "@/components/home/MoviePoster";
import { Movie } from "@/utils/types";
import Link from "next/link";
import MoviesColumn from "@/components/home/MoviesColumn";
import { MOVIES_URL } from "@/config/envConfig";
import { MdEventSeat } from "react-icons/md";

import "./home.css";

const HomePage = async () => {
	const response = await fetch(`${MOVIES_URL}/popularmovies`);
	if (!response.ok)
		throw new Error("Connection error: " + response.status.toString());
	const {
		nowShowing,
		comingSoon,
	}: { nowShowing: Movie[]; comingSoon: Movie[] } = await response.json();

	return (
		<main className="home-page-container">
			<section className="first-section">
				<Carousel movies={nowShowing} />
			</section>
			<br />
			<div className="second-section my-8">
				<div className="section-title">
					<span>What's on</span>
				</div>
				<br />
				<div className="grid-container">
					<div className="movie-grid">
						{nowShowing.map((movie, index) => (
							<MoviePoster
								key={movie.movie_id}
								movie={nowShowing[index]}
								isPosterBigger={index == 0 || index == 7}
							/>
						))}
					</div>
					<Link className="view-all-movies-btn" href="/movies/what's-on">
						View all movies
					</Link>
					<hr />
				</div>
			</div>
			<div className="upcoming-movies my-8">
				<div className="section-title">
					<span>
						Coming soon
					</span>
				</div>
				<div className="coming-soon-movies">
					{comingSoon.map((movie, index) => (
						<>
							<MoviesColumn movie={movie} key={movie.movie_id} />
							{index < 4 && index < comingSoon.length - 1 && (
								<hr className="dashed" />
							)}
						</>
					))}
				</div>
			</div>
		</main>
	);
};

export default HomePage;
