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