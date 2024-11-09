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

