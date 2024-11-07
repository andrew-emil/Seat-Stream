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

