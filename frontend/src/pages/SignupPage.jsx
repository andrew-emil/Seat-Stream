import React, { useReducer, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import "../css/pages/signup.css";

//initial state...
const initialState = {
	formData: {
		username: "",
		email: "",
		phone: "",
		password: "",
		confirmPass: "",
	},
	errors: {},
	showPassword: false,
	showConfirmPassword: false,
	countryCode: "+20",
};

//state functions...
const reducer = (state, action) => {
	switch (action.type) {
		case "SET_FIELD":
			return {
				...state,
				formData: {
					...state.formData,
					[action.field]: action.value,
				},
			};
		case "SET_ERRORS":
			return {
				...state,
				errors: action.errors,
			};
		case "TOGGLE_PASSWORD_VISIBILITY":
			return {
				...state,
				showPassword: !state.showPassword,
			};
		case "TOGGLE_CONFIRM_PASS_VISIBILITY":
			return {
				...state,
				showConfirmPassword: !state.showConfirmPassword,
			};
		case "SET_COUNTRY_CODE":
			return {
				...state,
				countryCode: action.value,
			};
		default:
			return state;
	}
};

// Custom hook for form validation...
const useValidation = (formData) => {
	const validate = (name, value) => {
		const errors = {};
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		
		if (!value.trim()) {
			errors[name] = `${name} is required`;
		}
		
		if (name === "username" && value.length < 3) {
			errors.username = "Username must be at least 3 characters long";
		}
		
		if (name === "email" && !emailRegex.test(value)) {
			errors.email = "Invalid email format";
		}
		
		if (name === "phone" && isNaN(parseInt(value))) {
			errors.phone = "Phone number must be numeric";
		}
		
		if (name === "confirmPass" && formData.password !== value) {
			errors.confirmPass = "Passwords must match";
		}

		return errors;
	};

	return validate;
};

const SignupPage = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [serverErr, setSeverErr] = useState("");
	const [isLoading , setIsLoading] = useState(false)
	const navigate = useNavigate();
	const location = useLocation();

	const validate = useValidation(state.formData);

	const handleCountryCodeChange = (e) => {
		dispatch({ type: "SET_COUNTRY_CODE", value: e.target.value });
	};

	const handleChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		dispatch({
			type: "SET_FIELD",
			field: name,
			value,
		});
	};

	const togglePasswordVisibility = () => {
		dispatch({ type: "TOGGLE_PASSWORD_VISIBILITY" });
	};

	const toggleConfirmPassVisibility = () => {
		dispatch({ type: "TOGGLE_CONFIRM_PASS_VISIBILITY" });
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		const formattedPhone = state.countryCode + state.formData.phone;
		const formDataToSend = { ...state.formData, phone: formattedPhone };

		const validationErrors = {};
		Object.keys(state.formData).forEach((key) => {
			const fieldErrors = validate(key, state.formData[key]);
			if (Object.keys(fieldErrors).length) {
				validationErrors[key] = fieldErrors[key];
			}
		});

		// If there are validation errors, stop submission
		if (Object.keys(validationErrors).length > 0) {
			dispatch({ type: "SET_ERRORS", errors: validationErrors });
			return;
		}
		const signUpAPI = process.env.REACT_APP_REGISTER_API;
		const fromPage = location.state?.from || "/";
		setIsLoading(true)

		await axios
			.post(signUpAPI, formDataToSend, {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			})
			.then((data) => {
				if (data.status === 200) {
					setIsLoading(false)
					navigate(fromPage);
				}
			})
			.catch((err) => {
				setIsLoading(false)
				setSeverErr(err.response?.data?.error || "Signup failed");
			});
	};

	return (
			<div className="signup-container">
				<form onSubmit={handleFormSubmit} className="signup-form">
					<div className="form-group">
						<label>
							Username:
							<input
								type="text"
								name="username"
								className="inputfield"
								value={state.formData.username}
								onChange={handleChange}
								placeholder="Please enter a username"
							/>
							{state.errors.username && (
								<span className="error-message">{state.errors.username}</span>
							)}
						</label>
						<br />
						<label>
							Email:
							<input
								type="text"
								name="email"
								className="inputfield"
								value={state.formData.email}
								onChange={handleChange}
								placeholder="Email"
							/>
							{state.errors.email && (
								<span className="error-message">{state.errors.email}</span>
							)}
						</label>
						<br />
						<div className="phone-number-input">
							<label>Phone Number:</label>
							<select
								value={state.countryCode}
								onChange={handleCountryCodeChange}>
								<option value="+20">Egypt (+20)</option>
								<option value="+1">USA (+1)</option>
								<option value="+44">UK (+44)</option>
								<option value="+91">India (+91)</option>
								<option value="+61">Australia (+61)</option>
								<option value="+81">Japan (+81)</option>
								<option value="+49">Germany (+49)</option>
								<option value="+33">France (+33)</option>
							</select>
							<input
								type="tel"
								placeholder="Phone Number"
								name="phone"
								className="inputfield"
								value={state.formData.phone}
								onChange={handleChange}
							/>
							{state.errors.phone && (
								<span className="error-message">{state.errors.phone}</span>
							)}
						</div>
						<br />
						<label>
							Password:
							<input
								type={state.showPassword ? "text" : "password"}
								name="password"
								className="inputfield"
								value={state.formData.password}
								onChange={handleChange}
								placeholder="Password"
							/>
							<button
								type="button"
								disabled={state.formData.password !== "" ? false : true}
								className="toggle-visibility"
								onClick={togglePasswordVisibility}>
								{state.showPassword ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="size-6">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
										/>
									</svg>
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="size-6">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
										/>
									</svg>
								)}
							</button>
							{state.errors.password && (
								<span className="error-message">{state.errors.password}</span>
							)}
						</label>
						<br />
						<label>
							Confirm Password:
							<input
								type={state.showConfirmPassword ? "text" : "password"}
								name="confirmPass"
								className="inputfield"
								value={state.formData.confirmPass}
								onChange={handleChange}
								placeholder="Confirm Password"
							/>
							<button
								type="button"
								className="toggle-visibility"
								disabled={state.formData.confirmPass !== "" ? false : true}
								onClick={toggleConfirmPassVisibility}>
								{state.showConfirmPassword ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="size-6">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
										/>
									</svg>
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="size-6">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
										/>
									</svg>
								)}
							</button>
							{state.errors.confirmPass && (
								<span className="error-message">
									{state.errors.confirmPass}
								</span>
							)}
						</label>
						{serverErr && <span className="err-msg-server">{serverErr}</span>}
						<br />
						<button type="submit" className="form-submit">
							{isLoading ? "Creating User..." : "Create Account"}
						</button>
						<span className="login-nav">
							Already have an account? <a href="/login">Login</a>
						</span>
					</div>
				</form>
			</div>
	);
};

export default SignupPage;
