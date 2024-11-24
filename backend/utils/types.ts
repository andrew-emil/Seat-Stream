import { InferAttributes, InferCreationAttributes, Model } from "sequelize";

export interface User {
	id: string;
	username: string;
	email: string;
	password: string;
	phone_no: string;
	is_admin: boolean;
}

export interface Genres {
	genre_id: number;
	genre_name: string;
}

export interface JwtPayload {
	id: string;
	username: string;
	isAdmin: boolean;
}

export interface Movie
	extends Model<InferAttributes<Movie>, InferCreationAttributes<Movie>> {
	movie_id: string;
	movieTitle: string;
	movieStory: string;
	trailer: string;
	language: string;
	running_time: number;
	now_showing: boolean;
	starring: string;
	director: string;
	release_date: Date;
}
