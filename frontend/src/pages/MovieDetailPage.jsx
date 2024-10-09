import React from "react";

import Showtime from "../components/Showtime";
import { useLocation } from "react-router-dom";

import "../css/pages/movieDetailPage.css";
import { useQuery } from "react-query";
import axios from "axios";

const MovieDetailPage = () => {
	const location = useLocation();
	const { movie } = location.state;
	const index = movie.trailer.indexOf("=");
	const embedURL = `http://www.youtube.com/embed/
	${movie.trailer.slice(index + 1, movie.trailer.length)}`;

	const formattedDate = new Date(movie.release_date).toLocaleDateString(
		"en-US",
		{ year: "numeric", month: "long", day: "numeric" }
	);

	const { data, isLoading, _ } = useQuery(["recommended"], async () => {
		const movieGenre = {
			genre: movie.genre,
		};
		const recommendedMovies = await axios.get(
			"http://localhost:8000/api/movies/recommendedmovies",
			movieGenre,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer your-token",
				},
			}
		);
		console.log(recommendedMovies.data);
		return recommendedMovies.data;
	});

	const movieCards = [
		[movie.title, movie.poster],
		[movie.title, movie.poster],
		[movie.title, movie.poster],
		[movie.title, movie.poster],
		[movie.title, movie.poster],
		[movie.title, movie.poster],
		[movie.title, movie.poster],
		[movie.title, movie.poster],
		[movie.title, movie.poster],
	];

	const viewShowtime = () => {
		window.scrollTo({
			top: 1500,
			behavior: "smooth",
		});
	};

	return (
		<div className="movie-detail">
			<h1 className="movie-title">{movie.title}</h1>
			<div className="image-container">
				<img src={movie.poster} alt="" className="movie-poster" />
				<div className="ratio ratio-16x9 movie-trailer">
					<iframe
						src={embedURL}
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
						allowFullScreen
						title={movie.title}></iframe>
				</div>
			</div>
			<button className="showtime-button" onClick={viewShowtime}>
				View Showtimes
			</button>
			<hr />
			<div className="details">
				<div className="category">
					Genre: <span className="data">{movie.genre}</span>
				</div>
				<div className="category">
					Running Time: <span className="data">{movie.running_time} min</span>
				</div>
				<div className="category">
					Release Date: <span className="data">{formattedDate}</span>
				</div>
				<div className="category">
					Director: <span className="data">{movie.director}</span>
				</div>
				<div className="category">
					Starring: <span className="data">{movie.starring}</span>
				</div>
				<div className="category">
					Language: <span className="data">{movie.language}</span>
				</div>
				<div className="story-line">{movie.story}</div>
			</div>
			<hr />
			<div className="movie-list-container">
				{movieCards.map((card, index) => (
					<MovieCard title={card[0]} posterUrl={card[1]} key={index} />
				))}
			</div>
			<hr />
			<div className="showtime">
				<h2>{movie.title} - Showtime</h2>
				{movie.now_showing === 0 ? (
					<h4 className="coming-soon">Coming Soon!</h4>
				) : (
					<Showtime />
				)}
			</div>
		</div>
	);
};

const MovieCard = ({ title, posterUrl }) => {
	return (
		<div className="movie-card">
			<ul>
				<li>
					<img src={posterUrl} alt="" className="poster" />
					<div class="text-container">
						<div className="title">{title}</div>
						<button className="showtimes-button">Showtimes</button>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default MovieDetailPage;
