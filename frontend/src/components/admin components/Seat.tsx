interface SeatProps {
	isSelected: boolean;
	onClick: () => void;
}

const Seat = ({ isSelected, onClick }: SeatProps) => {
	return (
		<div
			onClick={onClick}
			className={`cursor-pointer rounded ${
				isSelected ? "bg-blue-500" : "bg-gray-800"
			} w-8 h-8  m-0.5`}
		/>
	);
};

export default Seat