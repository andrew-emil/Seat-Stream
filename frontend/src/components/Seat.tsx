'use client'
import styles from "@/app/reservation/reservation.module.css";
import { useState } from "react";

const Seat = () => {
	const [selectedSeats, setSelectedSeats] = useState([]);

	const confirmHandle = () => {
		console.log("seats Confirmed");
	};

	return (
		<>
			<div className="flex justify-center items-center m-auto w-full">
				{
					//TODO: add seats
				}
			</div>
			<hr className="w-[98%]  mx-5" />
			<div className="flex flex-row justify-between items-center flex-wrap my-2">
				<span className={styles.available}>Available</span>
				<span className={styles.yourSeat}>Your seat</span>
				<span className={styles.unavailable}>Unavailable</span>
			</div>
			<div className="flex flex-col items-start h-[160px] w-full relative left-2.5">
				<h3 className="text-[#f5f5f5] font-bold">Your Selected Seats</h3>
				{selectedSeats.length > 0 ? (
					<p className="text-[#f5f5f5] p-2.5 text-lg">
						X{selectedSeats.length} - 140.00EGP per ticket
					</p>
				) : (
					<p className="text-[#f5f5f5] p-2.5 text-lg">No seat selected</p>
				)}
				<button
					className="text-[#f5f5f5] bg-[#7f094b] hover:bg-[#a7517c] border-none rounded-md w-36 text-lg p-2 cursor-pointer transition"
					onClick={confirmHandle}>
					Confirm Seats
				</button>
			</div>
		</>
	);
};

export default Seat;
