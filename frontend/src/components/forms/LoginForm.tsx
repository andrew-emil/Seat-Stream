"use client";
import React, { useState } from "react";
import Link from "next/link";
import ButtonSpinner from "../ButtonSpinner";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";

import "@/app/(user)/login/login.css";

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const [errorMessage, setErrorMessage] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const clearError = () => {
		setErrorMessage("");
	};

	const onSubmit = async (data: FieldValues) => {
		setIsLoading(true);
		clearError();
		const api = process.env.USERS_API as string;
		try {
			axios
				.post(`${api}/login`, data, {
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				})
				.then(() => {
					setIsLoading(false);
					router.replace("/");
				});
		} catch (err: any) {
			setErrorMessage(err.response?.data?.message || "Login failed");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="form-fields">
			<div className="form-group">
				<label>Username or Email</label>
				<input
					type="text"
					{...register("usernameOrEmail", { required: true })}
					placeholder="Enter your username or email"
				/>
				{errors.usernameOrEmail && (
					<span className="err-msg">please enter your username or email</span>
				)}
				<br />
				<label>Password</label>
				<input
					type={showPassword ? "text" : "password"}
					placeholder="Enter your password"
					{...register("password", { required: true })}
				/>
				<button
					type="button"
					className="pass-toggle-visibility"
					disabled={watch("password") === ""}
					onClick={togglePasswordVisibility}>
					{showPassword ? <FiEyeOff size={24} /> : <FiEye size={24} />}
				</button>
				{errors.password && (
					<span className="err-msg">please enter your password</span>
				)}

				{errorMessage !== "" && <span className="err-msg">{errorMessage}</span>}
				<button type="submit" className="submit-button" disabled={isLoading}>
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
