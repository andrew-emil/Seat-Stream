import { useState, useEffect } from "react";
import Seat from "./Seat";

interface TheaterLayoutProps {
	rows: number;
	seatsNumber: number;
	sendData: (data: boolean[][]) => void;
}

const TheaterLayout = ({ rows, seatsNumber, sendData }: TheaterLayoutProps) => {
	const numberOfSeats = seatsNumber + 5;
	const [seats, setSeats] = useState<boolean[][]>([]);

	useEffect(() => {
		const initialSeats = Array(rows)
			.fill(null)
			.map(() => Array(seatsNumber + 5).fill(false));
		setSeats(initialSeats);
	}, [rows, seatsNumber]);

	const handleSeatClick = (rowIndex: number, colIndex: number) => {
		setSeats((prevSeats) => {
			const updatedSeats = prevSeats.map((row, rIdx) =>
				row.map((seat, cIdx) =>
					rIdx === rowIndex && cIdx === colIndex ? !seat : seat
				)
			);
			sendData(updatedSeats);
			return updatedSeats;
		});
	};

	return (
		<div className="p-2">
			<h2 className="text-xl font-semibold mb-4 text-[#f5f5f5]">
				Select Seats
			</h2>
			<div className="flex flex-col gap-2">
				{seats.map((row, rowIndex) => (
					<div key={rowIndex} className="flex items-center">
						{/* Row Number */}
						<div className="w-7 text-center font-semibold mr-2 text-[#f5f5f5]">
							Row {rowIndex + 1}
						</div>
						{/* Row of Seats */}
						<div
							className={`grid gap-2 sm:gap-1`}
							style={{
								gridTemplateColumns: `repeat(${numberOfSeats}, minmax(0, 1fr))`,
							}}>
							{row.map((isSelected, colIndex) => (
								<Seat
									key={`${rowIndex}-${colIndex}`}
									isSelected={isSelected}
									onClick={() => handleSeatClick(rowIndex, colIndex)}
								/>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default TheaterLayout;
