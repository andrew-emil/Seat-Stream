"use client";
import { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { CiCirclePlus } from "react-icons/ci";
import TheaterLayout from "../admin components/TheaterLayout";

const AddTheaterForm = () => {
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [showTheaterPattern, setTheaterPattern] = useState<boolean>(false);
	const [seats, setSeats] = useState<boolean[][] | null>(null);

	const handleDataReceived = (data: boolean[][]) => {
		setSeats(data)
	}

	const onSubmit = (data: FieldValues) => console.log(data, seats);

	return (
		<form
			className="flex flex-col shadow-md p-5"
			onSubmit={handleSubmit(onSubmit)}>
			<div className="form-group w-auto">
				<label>Theater number</label>
				<input
					type="number"
					{...register("theaterNumber", { required: true })}
				/>
				{errors.theaterNumber && (
					<p className="err-msg">Theater number field is required</p>
				)}

				<label>Number of rows</label>
				<input type="number" {...register("rows", { required: true })} />
				{errors.rows && (
					<p className="err-msg">Number of rows field is required</p>
				)}

				<label>Seats per row</label>
				<input type="number" {...register("seats", { required: true })} />
				{errors.seats && (
					<p className="err-msg">Seats per row field is required</p>
				)}

				{!showTheaterPattern && (
					<button
						className="text-blue-900 text-lg hover:text-blue-500 cursor-pointer border-none flex flex-row justify-between items-center font-bold"
						onClick={() => setTheaterPattern(true)}>
						<CiCirclePlus className="mx-1" />
						Add Rows
					</button>
				)}
				{showTheaterPattern && (
					<>
						<div
							className="w-[250px] h-[70px] bg-gradient-to-r from-[#e0e0e0] to-[#f5f5f5] flex justify-center items-center m-auto my-2"
							style={{
								clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
							}}>
							<span className="font-bold text-center text-gray-800 text-lg">
								SCREEN
							</span>
						</div>
						<TheaterLayout
							rows={parseInt(watch("rows"))}
							seatsNumber={parseInt(watch("seats"))}
							sendData={handleDataReceived}
						/>
						<button className="submit-button" type="submit">
							Add Theater
						</button>
					</>
				)}
			</div>
		</form>
	);
};

export default AddTheaterForm;
