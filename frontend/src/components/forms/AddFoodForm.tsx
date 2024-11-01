"use client";
import React, { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import ButtonSpinner from "../ButtonSpinner";

const AddFoodForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const onSubmit = (data: FieldValues) => console.log(data);

	return (
		<form className="form-fields" onSubmit={handleSubmit(onSubmit)}>
			<div className="form-group">
				<label>Food name</label>
				<input
					type="text"
					{...register("foodName", { required: true })}
					placeholder="Enter food Name"
				/>
				{errors.foodName && (
					<p className="err-msg">food name field is required</p>
				)}

				<label>Price</label>
				<input
					type="number"
					{...register("price", { required: true })}
					placeholder="Enter Item Price"
				/>
				{errors.price && <p className="err-msg">price field is required</p>}

				<label>Category</label>
				<select {...register("category")}>
					{
						//TODO: fetch categories from db
					}
				</select>

				<label>Picture</label>
				<input type="file" {...register("picture", { required: true })} />
				{errors.picture && <p className="err-msg">picture field is required</p>}

				<button type="submit" className="submit-button" disabled={isLoading}>
					{isLoading ? <ButtonSpinner /> : "Add Food Item"}
				</button>
			</div>
		</form>
	);
};

export default AddFoodForm;
