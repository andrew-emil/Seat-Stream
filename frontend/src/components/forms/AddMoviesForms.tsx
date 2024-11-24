"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FieldValues, useForm } from "react-hook-form";
import ButtonSpinner from "../ButtonSpinner";
import Genres from "../admin components/Genres";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { MOVIES_URL } from "@/config/envConfig";

const AddMoviesForms = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [genreNumber, setGenreNumber] = useState(1);
	const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

	const handleGenreSelection = (genreId: number) => {
		setSelectedGenres((prevGenres) =>
			prevGenres.includes(genreId)
				? prevGenres.filter((id) => id !== genreId)
				: [...prevGenres, genreId]
		);
	};

	const renderGenreFields = () => {
		return Array.from({ length: genreNumber }, (_, index) => (
			<Genres key={index} onGenreSelection={handleGenreSelection} />
		));
	};

	const onSubmit = async (data: FieldValues) => {
		const payload = new FormData();

		// Append form fields to FormData
		payload.append("title", data.title.trim());
		payload.append("story", data.story.trim());
		payload.append("trailer", data.trailer.trim());
		payload.append("language", data.language.trim());
		payload.append("release_date", data.release_date);
		payload.append("running_time", data.running_time || ""); // Optional field
		payload.append("now_showing", data.now_showing ? "true" : "false");
		payload.append("starring", data.starring.trim());
		payload.append("director", data.director.trim());

		// Append selected genres
		selectedGenres.forEach((genre, index) => {
			payload.append(`genres[${index}]`, genre.toString());
		});

		// Append the poster file
		const fileInput = document.querySelector(
			"input[type='file']"
		) as HTMLInputElement;
		if (fileInput?.files?.[0]) {
			payload.append("poster", fileInput.files[0]); // `poster` is the key expected by the backend
		}

		setIsLoading(true);
		try {
			// Make API request to add the movie
			const response = await axios.post(`${MOVIES_URL}/addmovie`, payload, {
				withCredentials: true,
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			// Handle success response
			toast.success("Movie added successfully!");
			router.push("/admin/movies-table");
		} catch (err: any) {
			// Handle error response
			console.log(err)
			toast.error(err.response?.data?.message || "Failed to add movie");
		} finally {
			setIsLoading(false);
		}
	};


	return (
		<form onSubmit={handleSubmit(onSubmit)} className="form-fields">
			<div className="form-group">
				<label>Movie Title</label>
				<input
					type="text"
					{...register("title", { required: true })}
					placeholder="Enter Movie Name"
				/>
				{errors.title && (
					<p className="err-msg">Movie Title field is required</p>
				)}

				<label>Movie Title</label>
				<textarea
					{...register("story", { required: true })}
					rows={5}
					placeholder="Enter Movie description..."
				/>
				{errors.story && (
					<p className="err-msg">Movie Story field must be provided</p>
				)}

				<label>Trailer</label>
				<input
					type="text"
					{...register("trailer", { required: true })}
					placeholder="Enter movie trailer"
				/>
				{errors.trailer && (
					<p className="err-msg">Trailer field must be provided</p>
				)}
				<div>
					<label>Genres</label>
					{renderGenreFields()}
				</div>

				<div className="flex flex-row justify-between">
					<button
						className="text-blue-900 text-lg hover:text-blue-500 cursor-pointer border-none flex flex-row justify-between items-center font-bold"
						onClick={(e) => {
							e.preventDefault();
							if (genreNumber === 5) {
								toast.warn("Genres must not exceed 5");
								return;
							}
							setGenreNumber((prev) => prev + 1);
						}}>
						<CiCirclePlus className="mx-1" />
						Add Genre
					</button>

					<button
						className="text-blue-900 text-lg hover:text-blue-500 cursor-pointer border-none flex flex-row justify-between items-center font-bold"
						onClick={(e) => {
							e.preventDefault();
							if (genreNumber === 1) {
								toast.warn("Movie must have atleast 1 genre");
								return;
							}
							setGenreNumber((prev) => prev - 1);
						}}>
						<CiCircleMinus className="mx-1" />
						Remove Genre
					</button>
				</div>

				<label>Language</label>
				<input
					type="text"
					{...register("language", { required: true })}
					placeholder="Enter Movie language"
				/>
				{errors.language && (
					<p className="err-msg">language field must be provided</p>
				)}

				<label>Running time</label>
				<input
					type="number"
					{...register("running_time")}
					placeholder="Enter movie running time if known"
				/>

				<div className="flex flex-row justify-center items-center gap-40 p-4 rounded-lg">
					<label>Is Available:</label>
					<input
						type="checkbox"
						{...register("now_showing")}
						className="appearance-none w-6 h-6 rounded-full bg-[#444] border border-gray-500 checked:bg-blue-600 checked:border-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer transition duration-200"
					/>
				</div>

				<label>Starring</label>
				<input
					type="text"
					{...register("starring", { required: true })}
					placeholder="Enter Movie stars"
				/>
				{errors.starring && (
					<p className="err-msg">starring field must be provided</p>
				)}

				<label>Director</label>
				<input
					type="text"
					{...register("director", { required: true })}
					placeholder="Enter Movie director"
				/>
				{errors.director && (
					<p className="err-msg">director field must be provided</p>
				)}

				<label>Release Date</label>
				<input type="date" {...register("release_date", { required: true })} />
				{errors.release_date && (
					<p className="err-msg">Please enter movie releasing date</p>
				)}

				<label>Movie poster</label>
				<input
					type="file"
					{...register("poster", { required: true })}
					name="poster"
				/>
				{errors.poster && (
					<p className="err-msg">Please enter a poster for the movie</p>
				)}

				<button type="submit" className="submit-button" disabled={isLoading}>
					{isLoading ? <ButtonSpinner /> : "Add Movie"}
				</button>
			</div>
		</form>
	);
};

export default AddMoviesForms;
