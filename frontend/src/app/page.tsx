import Carousel from "@/components/home/Carousel";
import MoviePoster from "@/components/home/MoviePoster";
import { Movie } from "@/utils/types";
import Link from "next/link";
import MoviesColumn from "@/components/home/MoviesColumn";
import { MdEventSeat } from "react-icons/md";
import { MOVIES_URL } from "@/config/envConfig";

import "./home.css";

const HomePage = async () => {
	const response = await fetch(`${MOVIES_URL}/popularmovies`);
	if (!response.ok)
		throw new Error("Connection error: " + response.status.toString());
	const movies = await response.json();
	const nowShowing: Movie[] = movies.nowShowing;
	const comingSoon: Movie[] = movies.comingSoon;

	return (
		<main className="flex justify-center items-center w-full min-h-[300vh] h-auto">
			<>
				<div className="absolute top-[85px] flex flex-col items-center h-[400px] max-w-[100vw]">
					<Carousel movie={nowShowing} />
				</div>
				<br />
				<div className="absolute flex flex-col items-start justify-start w-full p-5 h-[900px]">
					<div className="top-[70%] section-title">
						<span className="relative left-[10px] m-5 font-bold text-lg text-text-color">
							What's on
						</span>
					</div>
					<br />
					<div className="w-full">
						<div className="grid grid-cols-4 grid-rows-3 gap-5 p-4">
							{nowShowing.map((movie, index) => (
								<MoviePoster
									key={movie.movie_id}
									movie={movies[index]}
									isPosterBigger={index == 0 || index == nowShowing.length - 1}
								/>
							))}
						</div>

						<Link
							className="block outline-none border-none p-4 text-text-color rounded-lg bg-button-color hover:bg-button-hover transition relative left-1/2 transform -translate-x-1/2 w-[200px] font-bold text-center cursor-pointer text-lg mt-5"
							href="/movies/what's-on">
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
						{comingSoon.map((movie, index) => (
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
