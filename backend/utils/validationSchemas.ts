import { z } from "zod";

export const registerSchema = z.object({
	username: z
		.string({ message: "username field must be provided" })
		.min(5, "username must be at least 5 characters long"),
	email: z
		.string({ message: "email field must be provided" })
		.email("Please enter a valid Email address"),
	password: z
		.string({ message: "password field must be provided" })
		.min(8, "password must be at least 8 characters long"),
	phone_no: z
		.string({ message: "phone field must be provided" })
		.min(8, "Please enter a valid phone number")
		.refine((val) => val[0] === "+", {
			message: "Please enter a valid phone number",
		}),
});

export const addMovieSchema = z.object({
	title: z
		.string({ message: "movie's title field must be provided" })
		.min(2, { message: "Title must be at least 2 characters long" })
		.max(100, { message: "Title must not exceed 100 characters" })
		.trim(),
	story: z
		.string({ message: "movie's story field must be provided" })
		.min(10, { message: "Story must be at least 10 characters long" })
		.trim(),
	trailer: z
		.string({ message: "movie's trailer field must be provided" })
		.url({ message: "Invalid URL format" })
		.regex(/^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/, {
			message: "Must be a valid YouTube URL",
		}),
	genres: z
		.array(z.number(), { message: "Genres must be an array of numbers" })
		.min(1, { message: "At least one genre must be selected" }),
	language: z.string({ message: "language field must be provided" }),
	release_date: z
		.string({ message: "Release date must be provided" })
		.transform((val) => new Date(val))
		.refine((date) => !isNaN(date.getTime()), {
			message: "Invalid date format",
		}),
	running_time: z
		.number()
		.min(1, { message: "Running time must be at least 1 minute" })
		.max(500, { message: "Running time must not exceed 500 minutes" })
		.optional(),
	now_showing: z.boolean().default(false),
	starring: z.string({ message: "starring field must be provided" }),
	director: z.string({ message: "director field must be provided" }),
});
