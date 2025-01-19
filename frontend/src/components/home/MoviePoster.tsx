"use client";
import React, { useState } from "react";
import { Movie } from "@/utils/types";
import Link from "next/link";
import Image from "next/image";

import "@/app/home.css";

interface MoviePosterProps {
	movie: Movie;
	isPosterBigger: boolean;
}

const MoviePoster = ({ movie, isPosterBigger }: MoviePosterProps) => {
	const [showDetails, setShowDetails] = useState(false);

	return (
		<div
			className={`movie-item ${isPosterBigger ? "bigger-poster" : ""}`}
			onMouseEnter={() => setShowDetails(true)}
			onMouseLeave={() => setShowDetails(false)}>
			<Image
				src={movie.poster}
				alt={movie.title}
				height={350}
				width={300}
			/>
			<div className="movie-details" style={{ opacity: showDetails ? 1 : 0 }}>
				<h3 className="mt-2.5 text-text-color">{movie.title}</h3>
				{isPosterBigger && (
					<p className="text-text-color flex w-full h-full text-sm">
						{movie.story}
					</p>
				)}
				<div className="button-container">
					<button className="more-info-btn">More Info</button>
					<button className="book-now-btn">Book Now</button>
				</div>
			</div>
		</div>
	);
};

export default MoviePoster;
