import { MdEventSeat } from "react-icons/md";
import dynamic from "next/dynamic";
import Loading from "../loading";

const Seat = dynamic(() => import("@/components/Seat"), {
	loading: () => Loading(),
	ssr: false,
});

const ReservationPage = () => {
	return (
		<main className="flex justify-center items-center flex-col m-auto w-full shadow-lg">
			<h1 className="flex self-start text-[#f5f5f5] text-2xl font-bold relative left-2.5 p-3">
				BOOK TICKETS
			</h1>
			<hr className="w-[98%]  mx-5" />
			<div className="flex self-start justify-center tex-xl text-[#f5f5f5] font-bold relative left-2.5 p-2">
				<MdEventSeat color="#2196f3" className="m-auto flex self-start justify-center" size={26} />
				<h2 className="m-2.5 text-xl">CHOOSE SEATS</h2>
			</div>
			<hr className="w-[98%]  mx-5" />
			<div
				className="w-[250px] h-[70px] bg-gradient-to-r from-[#e0e0e0] to-[#f5f5f5] flex justify-center items-center m-auto my-2"
				style={{ clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)" }}>
				<span className="font-bold text-center text-gray-800 text-lg">
					SCREEN
				</span>
			</div>
			<Seat />
		</main>
	);
};

export default ReservationPage;