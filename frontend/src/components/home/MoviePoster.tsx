"use client";
import React, { useState } from "react";
import { Movie } from "@/utils/types";
import Image from "next/image";
import { useRouter } from "next/router";

import "@/app/home.css";

const MoviePoster = (movie: Movie) => {
	const [showDetails, setShowDetails] = useState(false);
	const router = useRouter();

	const handleMoreInfoClick = () => {
		router.push("/movies/movieDetails", {
			query: encodeURIComponent(JSON.stringify(movie)),
		});
	};

	const handleBookNowClick = () => {
		router
			.push("/movies/movieDetails", {
				query: encodeURIComponent(JSON.stringify(movie)),
			})
			.then(() => {
				const showtimeSection = document.getElementById("showtime");
				showtimeSection?.scrollIntoView({
					behavior: "smooth",
					block: "nearest",
				});
			});
	};

	return (
		<div
			className="movie-poster"
			onMouseEnter={() => setShowDetails(true)}
			onMouseLeave={() => setShowDetails(false)}>
			<Image src={movie.poster} alt={movie.title} height={450} width={350} />
			<div className="movie-details" style={{ opacity: showDetails ? 1 : 0 }}>
				<h3>{movie.title}</h3>
				<p>{movie.story}</p>
				<div className="button-container">
					<button className="more-info-btn" onClick={handleMoreInfoClick}>
						More Info
					</button>
					<button className="book-now-btn" onClick={handleBookNowClick}>
						Book Now
					</button>
				</div>
			</div>
		</div>
	);
};

export default MoviePoster;
