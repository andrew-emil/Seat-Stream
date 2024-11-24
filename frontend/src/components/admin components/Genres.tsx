"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Genre } from "@/utils/types";
import {MOVIES_URL} from "@/config/envConfig"

interface GenresProps {
	onGenreSelection: (genreId: number) => void;
}

const Genres: React.FC<GenresProps> = ({ onGenreSelection }) => {
	const [genres, setGenres] = useState<Genre[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	// Fetch genres on component mount
	useEffect(() => {
		const fetchGenres = async () => {
			try {
				const response = await axios.get(
					`${MOVIES_URL}/genres`,
					{
						withCredentials: true,
					}
				);
				setGenres(response.data.genres);
			} catch (error: any) {
				setError(error.response?.data?.message || "failed to fetch genres");
			} finally {
				setLoading(false);
			}
		};

		fetchGenres();
	}, []);

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const genreId = parseInt(event.target.value);
		if (!isNaN(genreId)) onGenreSelection(genreId);
	};

	if (loading)
		return <p className="text-text-color font-bold">Loading genres...</p>;
	if (error) throw new Error(error);

	return (
		<select
			onChange={handleChange}
			className="w-full p-2.5 my-2 bg-input-bg-color border border-input-border-color rounded-md text-text-color placeholder:text-gray-400">
			<option value="">Select Genre</option>
			{genres.map((genre) => (
				<option key={genre.genre_id} value={genre.genre_id}>
					{genre.genre_name}
				</option>
			))}
			;
		</select>
	);
};

export default Genres;
