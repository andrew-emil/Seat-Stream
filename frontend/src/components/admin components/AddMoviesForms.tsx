'use client'
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import ButtonSpinner from "../ButtonSpinner";

import "@/app/admin/add-movies/addMovies.css"

const AddMoviesForms = () => {
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
		try {
			//add movies api
		} catch (err: any) {
			setIsLoading(false);
			toast.error(err.message);
		}
	};

	const clearError = (field: string) => {
		setErrorMessage((prevError) => ({
			...prevError,
			[field]: "",
		}));
	};

	return (
		<form onSubmit={handleFormSubmit} className="add-movie-form">
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
					{showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
				</button>
				{errorMessage.password && (
					<span className="err-msg">{errorMessage.password}</span>
				)}
				{errorMessage.backend && (
					<span className="err-msg-server">{errorMessage.backend}</span>
				)}
				<button type="submit" className="submit-button">
					{isLoading ? <ButtonSpinner /> : "Add Movie"}
				</button>
			</div>
		</form>
	);
};

export default AddMoviesForms;
