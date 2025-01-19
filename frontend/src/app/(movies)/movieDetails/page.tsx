import CustomButton from "@/components/CustomButton";
import { Movie } from "@/utils/types";
import Image from "next/image";
import { useRouter } from "next/router";

import "./moviesDetail.css";

const MoviePage = () => {
	const router = useRouter();
	const movie = router.query as unknown as Movie;
	const index = movie.trailer.indexOf("=");
	const embedURL = `http://www.youtube.com/embed/
	${movie.trailer.slice(index + 1, movie.trailer.length)}`;
	const formattedDate = new Date(movie.release_date).toLocaleDateString(
		"en-US",
		{ year: "numeric", month: "long", day: "numeric" }
	);

	return (
		<main className="flex justify-center items-center flex-col p-5 w-full h-auto">
			<h1 className="text-[#f5f5f5] font-bold flex items-start mb-5 text-xl relative left-[10px]">
				{movie.title}
			</h1>
			<div className="flex flex-row justify-between w-full sm:flex-col">
				<Image
					src={movie.poster}
					alt={movie.title}
					height={400}
					width={300}
					className="flex items-start mr-5 relative"
				/>
				<div className="ratio ratio-16x9 sm:m-5 sm:w-full">
					<iframe
						src={embedURL}
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
						allowFullScreen
						title={movie.title}
						className="w-[600px] h-[400px] sm:w-9/10"></iframe>
				</div>
			</div>
			<CustomButton
				btnText="View Showtime"
				handleClick={() =>
					window.scrollTo({
						top: 1500,
						behavior: "smooth",
					})
				}
			/>
			<hr className="w-full  mx-5" />
			<div className="flex justify-center items-start flex-col w-full">
				<div className="category font-bold">
					Genre:{" "}
					<span className="data">
						genres
						{
							//TODO: fetch from db
						}
					</span>
				</div>
				<div className="category font-bold">
					Running Time: <span className="data">{movie.running_time} min</span>
				</div>
				<div className="category font-bold">
					Release Date: <span className="data">{formattedDate}</span>
				</div>
				<div className="category font-bold">
					Director: <span className="data">{movie.director}</span>
				</div>
				<div className="category font-bold">
					Starring: <span className="data">{movie.starring}</span>
				</div>
				<div className="category font-bold">
					Language: <span className="data">{movie.language}</span>
				</div>
				<div className="story-line">{movie.story}</div>
			</div>
			<hr className="w-full  mx-5" />
			<div className="flex flex-row justify-between items-start gap-5 w-full h-[450px] overflow-x-scroll">
				<div className="flex justify-center flex-wrap">
					<ul className="list-none grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						{
							//TODO: fetch recommended movies
							//! limit 6 movies
						}
					</ul>
				</div>
			</div>
			<hr className="w-full  mx-5" />
			<div>
				<h2
					className="flex justify-center items-center text-[#f5f5f5] m-1.5"
					id="showtime">
					{movie.title} - Showtime
				</h2>
				{movie.now_showing ? (
					<h4 className="flex justify-center items-center text-[#f5f5f5] m-2 font-semibold">
						Coming soon!
					</h4>
				) : (
					<div></div>
					//TODO: showtime component
				)}
			</div>
		</main>
	);
};

export default MoviePage;
