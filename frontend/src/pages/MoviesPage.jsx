import React from "react";
import { useQuery } from "react-query";

import Loading from "./../components/Loading";
import axios from "axios";
import MoviesColumn from "../components/MoviesColumn";

import "../css/pages/moviesPage.css";

const MoviesPage = ({ pageTitle }) => {
	// eslint-disable-next-line no-unused-vars
	const { data, isLoading, error } = useQuery(
		["fetchSpecificMovies"],
		async () => {
			const getAPI = process.env.REACT_APP_GET_SPECIFIC_MOVIES;
			const response = await axios.get(getAPI, {
				params: {
					now_showing: pageTitle === "what's on" ? 1 : 0,
				},
			});
			return response.data;
		}
	);
	/**
	gets all movies depending on the params passed wether to get the shown movies or the upcoming movies
	
	 */


	return (
		<div className="movies-container">
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
					<div className="page-title">
						<p>{pageTitle}</p>
					</div>
					<div className="movies-column">
						{data.movies.map((movie, index) => (
							<>
								<MoviesColumn movie={movie} />
								{index < data.movies.length - 1 ? (
									<hr className="dashed" />
								) : null}
							</>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default MoviesPage;
