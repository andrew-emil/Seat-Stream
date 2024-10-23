"use client";

import React, { useState } from "react";
import { Movie } from "@/utils/types";
import Image from "next/image";
import "@/app/home.css";

const MoviePoster = (movie: Movie) => {
	const [showDetails, setShowDetails] = useState(false);

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
					<button className="more-info-btn">More Info</button>
					<button className="book-now-btn">Book Now</button>
				</div>
			</div>
		</div>
	);
};

export default MoviePoster;
