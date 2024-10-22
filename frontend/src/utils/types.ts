export interface State {
	formData: {
		[key: string]: string; // Assuming formData keys are dynamic field names
	};
	errors: {
		[key: string]: string; // Assuming errors are keyed by field names
	};
	showPassword: boolean;
	showConfirmPassword: boolean;
	countryCode: string;
}

export type Action =
	| { type: "SET_FIELD"; field: string; value: string }
	| { type: "SET_ERRORS"; errors: { [key: string]: string } }
	| { type: "TOGGLE_PASSWORD_VISIBILITY" }
	| { type: "TOGGLE_CONFIRM_PASS_VISIBILITY" }
	| { type: "SET_COUNTRY_CODE"; value: string };

export interface Errors {
	[key: string]: string;
}

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
}