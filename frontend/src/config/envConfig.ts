require("dotenv").config();

export const MOVIES_URL = process.env.NEXT_PUBLIC_MOVIES_API as string;
export const USERS_URL = process.env.NEXT_PUBLIC_USERS_API as string;
