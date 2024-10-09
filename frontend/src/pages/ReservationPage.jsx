import React, { useEffect, useState, useCallback, lazy, Suspense } from "react";

import Appbar from "./../components/Appbar";
import ChairIcon from "../components/ChairIcon";
import "../css/pages/reservationPage.css";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

const Seat = lazy(() => import("../components/Seat"));
const API_PATH = "http://localhost:8000/seatSelection.php";
//gets all seats from the database

const ReservationPage = () => {
	const [data, setData] = useState([]);
	const [selectedSeats, setSelectedSeats] = useState([]);

	const handleSeatSelect = useCallback((seats) => {
		setSelectedSeats(seats);
	}, []);

	const confirmHandle = () => {
		console.log("confirmHandle");
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(API_PATH);
				if (!res.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await res.json();
				setData(data);
			} catch (error) {
				console.error("Fetch error:", error);
			}
		};
		fetchData();
	}, []);

	return (
		<>
			<Appbar />
			<div className="reservation-container">
				<h1 className="title">BOOK TICKETS</h1>
				<hr className="solid-line" />
				<div className="icon-container">
					<ChairIcon className="icon" />
					<h2 className="choose-seat-text">CHOOSE SEATS</h2>
				</div>
				<hr className="solid-line" />
				<div className="screen-shape">
					<span className="screen-text">SCREEN</span>
				</div>
				<div className="seats-container">
					<Suspense fallback={<Loading />}>
						<Seat seatData={data} onSelectSeat={handleSeatSelect} />
					</Suspense>
				</div>
				<hr className="solid-line" />
				<div className="key">
					<span className="available">Available</span>
					<span className="your-seat">Your Seat</span>
					<span className="unavailable">Unavailable</span>
				</div>
				<hr className="solid-line" />
				<div className="confirmation-seats">
					<h3>Your Selected Seats</h3>
					{selectedSeats.length > 0 ? (
						<p className="seat-selection">
							X{selectedSeats.length} - 140.00EGP per ticket
						</p>
					) : (
						<p className="seat-selection">No seat selected</p>
					)}
					<button className="confirm-button" onClick={confirmHandle}>
						Confirm Seats
					</button>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default ReservationPage;
