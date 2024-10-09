import React, { useState } from "react";
import { useQuery } from "react-query";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";

import "../css/pages/home.css";
import "swiper/css/pagination";

import axios from "axios";
import Loading from "./../components/Loading";
import MoviesColumn from "../components/MoviesColumn";

const HomePage = () => {
	// eslint-disable-next-line no-unused-vars
	const { data, isLoading, error } = useQuery(["fetchMovies"], async () => {
		const moviesAPI = process.env.REACT_APP_GET_ALL_MOVIES;
		const response = await axios.get(moviesAPI);
		return [response.data.data.whatIsOn, response.data.data.upcomingMovies];
	});
	// 	The GET /movies/allmovies endpoint returns a JSON response with a status code of 200. The response body has a data object containing two arrays: whatIsOn and upcomingMovies. Each array contains objects representing movies with properties such as movie_id, title, trailer, running_time, story, language, poster, release_date, now_showing, starring, and director. The running_time property may have a null value for upcoming movies.
	// Here is a JSON schema representing the structure of the response:
	// {
	//   "type": "object",
	//   "properties": {
	//     "status": { "type": "string" },
	//     "data": {
	//       "type": "object",
	//       "properties": {
	//         "whatIsOn": {
	//           "type": "array",
	//           "items": {
	//             "type": "object",
	//             "properties": {
	//               "movie_id": { "type": "string" },
	//               "title": { "type": "string" },
	//               "trailer": { "type": "string" },
	//               "running_time": { "type": ["number", "null"] },
	//               "story": { "type": "string" },
	//               "language": { "type": "string" },
	//               "poster": { "type": "string" },
	//               "release_date": { "type": "string" },
	//               "now_showing": { "type": "boolean" },
	//               "starring": { "type": "string" },
	//               "director": { "type": "string" }
	//             }
	//           }
	//         },
	//         "upcomingMovies" => limit = 5 only : {
	//           "type": "array",
	//           "items": {
	//             "type": "object",
	//             "properties": {
	//               "movie_id": { "type": "string" },
	//               "title": { "type": "string" },
	//               "trailer": { "type": "string" },
	//               "running_time": { "type": ["number", "null"] },
	//               "story": { "type": "string" },
	//               "language": { "type": "string" },
	//               "poster": { "type": "string" },
	//               "release_date": { "type": "string" },
	//               "now_showing": { "type": "boolean" },
	//               "starring": { "type": "string" },
	//               "director": { "type": "string" }
	//             }
	//           }
	//         }
	//       }
	//     }
	//   }
	// }
	const navigate = useNavigate();

	const handleViewAllMoviesClick = () => navigate("/movies/whatson");

	return (
		<main className="home-page-container">
			{isLoading ? (
				<div className="loader-container">
					<Loading />
				</div>
			) : error ? (
				<div className="err-msg">
					<span>Something went wrong :(</span>
				</div>
			) : (
				<>
					<div className="first-section">
						<Carousel movies={data[0]} navigate={navigate} />
					</div>
					<br />
					<div className="second-section">
						<div className="section-title">
							<span>What's on</span>
						</div>
						<br />
						<div className="grid-container">
							<div className="movie-grid">
								{data[0].map((movie) => (
									<MoviePoster
										movie={movie}
										key={movie.id}
										navigate={navigate}
									/>
								))}
							</div>
							<button
								className="view-all-movies-btn"
								onClick={handleViewAllMoviesClick}>
								View all movies
							</button>
							<hr className="dashed" />
						</div>
						<div className="upcoming-movies">
							<div className="section-title coming.soon">
								<span>Coming soon</span>
							</div>
							<div className="coming-soon-movies">
								{data[1].map((movie, index) => (
									<>
										{/*only five movies*/}
										<MoviesColumn movie={movie} />
										{index < 4 && index < data[1].length - 1 ? (
											<hr className="dashed" />
										) : null}
									</>
								))}
							</div>
						</div>
					</div>
				</>
			)}
		</main>
	);
};

const Carousel = ({ movies, navigate }) => {
	return (
		<Swiper
			modules={[Navigation, Pagination, Autoplay]}
			direction="horizontal"
			navigation={{
				prevEl: ".button-prev",
				nextEl: ".button-next",
			}}
			pagination={{
				dynamicBullets: true,
			}}
			centeredSlides={true}
			autoplay={{
				delay: 2500,
				disableOnInteraction: false,
			}}
			rewind={true}
			slidesPerView="auto"
			speed={1000}
			effect="autoplay"
			onSlideChange={() => console.log("slide change")}>
			{movies.map((slide, index) => (
				<SwiperSlide
					key={slide}
					className="slide-inner"
					onClick={() => {
						navigate("/MovieDetail", {
							state: {
								movie: movies[index],
							},
						});
					}}>
					<img src={slide.poster} alt={slide.title} />
				</SwiperSlide>
			))}
			<div className="button-prev">
				<FiArrowLeft className="left-btn" />
			</div>
			<div className="button-next">
				<FiArrowRight className="right-btn" />
			</div>
		</Swiper>
	);
};

const MoviePoster = ({ movie }) => {
	const [showDetails, setShowDetails] = useState(false);

	const onMouseHover = () => setShowDetails(true);

	const onMouseLeave = () => setShowDetails(false);

	return (
		<div
			className="movie-poster"
			onMouseEnter={onMouseHover}
			onMouseLeave={onMouseLeave}>
			<img src={movie.poster} alt="" />
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

export default HomePage;
