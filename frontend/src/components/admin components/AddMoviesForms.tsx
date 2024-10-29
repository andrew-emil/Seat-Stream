"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { FieldValues, useForm } from "react-hook-form";
import ButtonSpinner from "../ButtonSpinner";

import "@/app/admin/add-movies/addMovies.css";
import "@/app/(user)/login/login.css";

const AddMoviesForms = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [isLoading, setIsLoading] = useState(false);
	const [categoryNum, setCategoryNum] = useState(1)
	const router = useRouter();

	const onSubmit = (data: FieldValues) => console.log(data);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="add-movie-form">
			<div className="form-group">
				<label>Movie Title</label>
				<input
					type="text"
					{...register("movieTitle", { required: true })}
					placeholder="Enter Movie Name"
				/>
				{errors.movieTitle && (
					<p className="err-msg">Movie Title is required</p>
				)}

				<label>Movie Title</label>
				<textarea
					{...register("movieStory", { required: true })}
					rows={5}
					placeholder="Enter Movie description..."
				/>
				{errors.movieTitle && (
					<p className="err-msg">Movie Story is required</p>
				)}

				<label>trailer</label>
				<input
					type="text"
					{...register("trailer", { required: true })}
					placeholder="Enter movie trailer"
				/>
				{errors.movieTitle && <p className="err-msg">Trailer is required</p>}

				{
					//TODO: category of movie
				}

				<label>Language</label>
				<input
					type="text"
					{...register("Language", { required: true })}
					placeholder="Enter Movie language"
				/>
				{errors.movieTitle && <p className="err-msg">Language is required</p>}

				<label>Running time</label>
				<input
					type="text"
					{...register("runningTime")}
					placeholder="Enter movie running time if known"
				/>

				<div className="flex flex-row justify-center items-center gap-40 p-4 rounded-lg">
					<label>Is Available:</label>
					<input
						type="checkbox"
						{...register("nowShowing")}
						className="appearance-none w-6 h-6 rounded-full bg-[#444] border border-gray-500 checked:bg-blue-600 checked:border-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer transition duration-200"
					/>
				</div>

				<label>Starring</label>
				<input
					type="text"
					{...register("starring", { required: true })}
					placeholder="Enter Movie stars"
				/>
				{errors.movieTitle && (
					<p className="err-msg">Please enter the movie's stars</p>
				)}

				<label>Director</label>
				<input
					type="text"
					{...register("director", { required: true })}
					placeholder="Enter Movie director"
				/>
				{errors.movieTitle && (
					<p className="err-msg">Please enter the director of the movie</p>
				)}

				<label>Release Date</label>
				<input type="date" {...register("releaseDate", { required: true })} />
				{errors.movieTitle && (
					<p className="err-msg">Please enter movie releasing date</p>
				)}

				<label>Movie poster</label>
				<input type="file" {...register("moviePoster", { required: true })} />
				{errors.movieTitle && (
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
