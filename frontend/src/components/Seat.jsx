import React, { useEffect, useState, useMemo, useCallback } from "react";
import '../css/components/seat.css'

const groupSeatsByRow = (seats) => {
	const rows = seats.reduce((acc, seat) => {
		const { row } = seat;
		if (!acc[row]) {
			acc[row] = [];
		}
		acc[row].push(seat);
		return acc;
	}, {});

	return Object.entries(rows).reverse();
};

const Seat = ({ seatData, onSelectSeat }) => {
	const [seats, setSeats] = useState([]);
	const [selectedSeats, setSelectedSeats] = useState([]);

	const groupedSeats = useMemo(() => groupSeatsByRow(seatData), [seatData]);

	const handleSeatClick = useCallback(
		(e) => {
			const { id, className } = e.target;
			const newSeats = [...selectedSeats];

			if (className === "available") {
				e.target.className = "selected-seat";
				newSeats.push(id);
			} else if (className === "selected-seat") {
				e.target.className = "available";
				const index = newSeats.indexOf(id);
				if (index > -1) {
					newSeats.splice(index, 1);
				}
			}

			setSelectedSeats(newSeats);
		},
		[selectedSeats]
	);

	useEffect(() => {
		setSeats(groupedSeats);
		onSelectSeat(selectedSeats);
	}, [groupedSeats, onSelectSeat, selectedSeats]);

	return (
		<table className="seating-chart">
			<tbody>
				{seats.map(([row, seat], rowIndex) => (
					<tr key={rowIndex}>
						<td className="empty"></td>
						<td className="empty"></td>
						{seat.map((seat, seatIndex) =>
							seatIndex === 4 ||
							seatIndex === 5 ||
							seatIndex === 15 ||
							seatIndex === 14 ? (
								<td key={seatIndex} className="empty"></td>
							) : (
								<td
									key={seatIndex}
									id={`${row}-${seatIndex}`}
									className={seat.status === 1 ? "available" : "unavailable"}
									onClick={handleSeatClick}></td>
							)
						)}
						<td className="empty"></td>
						<td className="empty"></td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default React.memo(Seat);
