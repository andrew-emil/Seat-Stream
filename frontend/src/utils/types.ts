export interface Movie {
	movie_id: string;
	title: string;
	trailer: string;
	running_time: number | null;
	story: string;
	language: string;
	poster: string;
	release_date: string;
	now_showing: boolean;
	starring: string;
	director: string;
	genres: string[];
}

export interface JwtPayload {
	id: string;
	username: string;
	isAdmin: boolean;
}

export interface UseAuthProps {
	userPayload?: JwtPayload | null;
}

export interface Genre {
	genre_id: number;
	genre_name: string;
}
