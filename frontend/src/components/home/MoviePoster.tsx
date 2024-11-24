"use client";
import React, { useState } from "react";
import { Movie } from "@/utils/types";
import Link from "next/link";
import Image from "next/image";

interface MoviePosterProps {
	movie: Movie;
	isPosterBigger: boolean;
}

const MoviePoster = ({ movie, isPosterBigger }: MoviePosterProps) => {
	const [showDetails, setShowDetails] = useState(false);


	return (
		<div
			className={`relative overflow-hidden m-0 flex items-center justify-center ${
				isPosterBigger ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
			}`}
			onMouseEnter={() => setShowDetails(true)}
			onMouseLeave={() => setShowDetails(false)}>
			<Image
				src={movie.poster}
				alt={movie.title}
				height={450}
				width={350}
				className="object-fill"
			/>
			<div
				className="absolute top-0 left-0 w-full h-full p-5 transition-opacity flex flex-col items-center"
				style={{ opacity: showDetails ? 1 : 0 }}>
				{isPosterBigger && (
					<>
						<h3 className="mt-2.5 text-text-color">{movie.title}</h3>
						<p className="text-text-color flex w-full h-full text-sm">
							{movie.story}
						</p>
					</>
				)}
				<div className="flex justify-between mt-2.5">
					<Link
						href={`/movieDetails/${movie}`}
						className="text-text-color outline-none cursor-pointer px-5 py-2 m-2 rounded-md bg-gray-900 hover:bg-button-hover border-solid border-[2px] border-button-hover transition">
						More Info
					</Link>
					<Link
						href="/"
						className="text-text-color outline-none cursor-pointer px-5 py-2 m-2 rounded-md bg-button-color hover:bg-button-hover border-none transition">
						Book Now
					</Link>
				</div>
			</div>
		</div>
	);
};

export default MoviePoster;
