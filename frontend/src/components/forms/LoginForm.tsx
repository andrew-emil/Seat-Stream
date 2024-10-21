'use client'
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import ButtonSpinner from "../ButtonSpinner";
import { useRouter } from "next/navigation";

import "@/app/(user)/login/login.css";

const LoginForm = () => {
	const [formData, setFormData] = useState({
		usernameOrEmail: "",
		password: "",
	});
	const [errorMessage, setErrorMessage] = useState({
		usernameOrEmail: "",
		password: "",
		backend: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();


	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
		clearError(name);
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const validateFormData = () => {
		let isValid = true;
		let updatedErrors = {
			usernameOrEmail: "",
			password: "",
			backend: "",
		};

		if (!formData.usernameOrEmail.trim()) {
			updatedErrors.usernameOrEmail = "please enter your username or email";
			isValid = false;
		}

		if (!formData.password.trim()) {
			updatedErrors.password = "please enter your password";
			isValid = false;
		}

		setErrorMessage(updatedErrors);
		return isValid;
	};

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrorMessage({ usernameOrEmail: "", password: "", backend: "" });

		const isValid = validateFormData();
		if (!isValid) return;

		setIsLoading(true);

		const loginAPI = process.env.REACT_APP_LOGIN_API as string;

		await axios
			.post(loginAPI, formData, {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			})
			.then((data) => {
				if (data.status === 200) {
					setIsLoading(false);
					window.history.length > 1 ? router.back() : router.replace("/")
				}
			})
			.catch((err) => {
				setIsLoading(false);
				setErrorMessage((prevError) => ({
					...prevError,
					backend: err.response.data.error,
				}));
			});
	};

	const clearError = (field: string) => {
		setErrorMessage((prevError) => ({
			...prevError,
			[field]: "",
		}));
	};

	return (
		<form onSubmit={handleFormSubmit} className="login-form">
			<div className="form-group">
				<label htmlFor="usernameOrEmail">Username or Email:</label>
				<input
					type="text"
					name="usernameOrEmail"
					id="usernameOrEmail"
					value={formData.usernameOrEmail}
					onChange={handleChange}
					placeholder="Enter your username or email"
				/>
				{errorMessage.usernameOrEmail && (
					<span className="err-msg">{errorMessage.usernameOrEmail}</span>
				)}
				<label>
					Password:
					<input
						type={showPassword ? "text" : "password"}
						name="password"
						className="inputfield"
						value={formData.password}
						onChange={handleChange}
						placeholder="Enter your password"
					/>
				</label>
				<button
					type="button"
					className="pass-toggle-visibility"
					disabled={formData.password !== "" ? false : true}
					onClick={togglePasswordVisibility}>
					{showPassword ? (
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
				{errorMessage.password && (
					<span className="err-msg">{errorMessage.password}</span>
				)}
				{errorMessage.backend && (
					<span className="err-msg-server">{errorMessage.backend}</span>
				)}
				<button type="submit" className="submit-button">
					{isLoading ? <ButtonSpinner /> : "Login"}
				</button>
				<span className="signup-nav">
					Don't have an account? <Link href="/register">Sign Up</Link>
				</span>
			</div>
		</form>
	);
};

export default LoginForm;
