import { z } from "zod";

export const addMovieSchema = z.object({
	movieTitle: z.string({ message: "Movie Title is required" }),
	movieStory: z
		.string({ message: "Movie Story is required" })
		.min(10, { message: "Movie Story must be at least 10 characters long" }),
	trailer: z.string({ message: "Trailer is required" }),
	language: z.string({ message: "Language is required" }),
	starring: z.string({ message: "Please enter the movie's stars" }),
	director: z.string({ message: "Please enter the director of the movie" }),
	moviePoster: z.string({ message: "Please enter a poster for the movie" }),
	runningTime: z.number().optional(),
	nowShowing: z.boolean().default(false),
	releaseDate: z.date(),
});
