import Image from "next/image";

interface MovieCardProps {
	title: string;
	posterUrl: string;
	handleClick: () => void;
}

const MovieCard = ({ title, posterUrl, handleClick }: MovieCardProps) => {
	return (
		<li className="h-[200px] w-[330px] p-2.5 bg-gray-800 rounded-sm">
			<Image src={posterUrl} alt={title} height={350} width={270} />
			<div>
				<div className="text-center text-[#f5f5f5] font-bold text-xl mx-2.5">
					{title}
				</div>
				<button
					className="text-[#f5f5f5] bg-[#7f094b] hover:bg-[#a7517c] block px-2.5 py-5 my-12.5 cursor-pointer border-none rounded-md"
					onClick={handleClick}>
					Showtime
				</button>
			</div>
		</li>
	);
};

export default MovieCard;
