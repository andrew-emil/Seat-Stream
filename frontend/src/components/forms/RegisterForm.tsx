"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import ButtonSpinner from "../ButtonSpinner";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";

import "@/app/(user)/register/register.css";

const RegisterForm = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [serverErr, setSeverErr] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	const toggleConfirmPassVisibility = () => {
		setShowConfirmPassword((prev) => !prev);
	};

	const onSubmit = (data: FieldValues) => console.log(data);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="signup-form">
			<div className="form-group">
				<label>
					Username:
					<input
						type="text"
						{...register("username", { required: true })}
						className="inputfield"
						placeholder="Please enter a username"
					/>
					{errors.username && (
						<span className="error-message">username field is required</span>
					)}
				</label>
				<br />
				<label>
					Email:
					<input
						type="text"
						{...register("email", { required: true })}
						className="inputfield"
						placeholder="Email"
					/>
					{errors.email && (
						<span className="error-message">Email field is required</span>
					)}
				</label>
				<br />
				<div className="phone-number-input">
					<label>Phone Number:</label>
					<select {...(register("codeCountry"), { defaultValue: "+20" })}>
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
						className="inputfield"
						{...register("phoneNumber", { required: true })}
					/>
					{errors.phoneNumber && (
						<span className="error-message">
							phone Number field is required
						</span>
					)}
				</div>
				<br />
				<label>
					Password:
					<input
						type={showPassword ? "text" : "password"}
						className="inputfield"
						{...register("password", { required: true })}
						placeholder="Password"
					/>
					<button
						type="button"
						disabled={watch('password') === ''}
						className="toggle-visibility"
						onClick={togglePasswordVisibility}>
						{showPassword ? <FiEyeOff size={24} /> : <FiEye size={24} />}
					</button>
					{errors.password && (
						<span className="error-message">password field is required</span>
					)}
				</label>
				<br />
				<label>
					Confirm Password:
					<input
						type={showConfirmPassword ? "text" : "password"}
						className="inputfield"
						{...register("confirmPassword", { required: true })}
						placeholder="Confirm Password"
					/>
					<button
						type="button"
						className="toggle-visibility"
						disabled={watch('confirmPassword') === ''}
						onClick={toggleConfirmPassVisibility}>
						{showConfirmPassword ? <FiEyeOff size={24}/> : <FiEye size={24} />}
					</button>
					{errors.confirmPassword && (
						<span className="error-message">
							confirm password field is required
						</span>
					)}
				</label>
				{serverErr && <span className="err-msg-server">{serverErr}</span>}
				<br />
				<button type="submit" className="form-submit" disabled={isLoading}>
					{isLoading ? <ButtonSpinner /> : "Create Account"}
				</button>
				<span className="login-nav">
					Already have an account? <Link href="/login">Login</Link>
				</span>
			</div>
		</form>
	);
};

export default RegisterForm;
