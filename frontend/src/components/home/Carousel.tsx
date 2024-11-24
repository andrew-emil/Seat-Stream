import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Movie } from "@/utils/types";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

import "@/app/home.css";
import "swiper/css/pagination";

interface CarouselProps {
	movie: Movie[];
}

const Carousel = ({ movie }: CarouselProps) => {
	return (
		<Swiper
			modules={[Navigation, Pagination, Autoplay]}
			direction="horizontal"
			navigation={{
				prevEl: ".button-prev",
				nextEl: ".button-next",
			}}
			pagination={{
				dynamicBullets: true,
			}}
			centeredSlides={true}
			autoplay={{
				delay: 2500,
				disableOnInteraction: false,
			}}
			rewind={true}
			slidesPerView="auto"
			speed={1000}
			effect="autoplay"
			className="w-full h-full overflow-hidden relative top-6 max-w-[100vw]">
			{movie.map((slide, index) => (
				<Link href={`movieDetails/${movie[index]}`}>
					<SwiperSlide
						key={index}
						className="w-full h-[90%] flex items-center justify-center cursor-pointer">
						<Image
							src={slide.poster}
							alt={slide.title}
							height={360}
							width={300}
							className="block object-fill"
						/>
					</SwiperSlide>
				</Link>
			))}
			<div className="button-prev">
				<FiArrowLeft className="left-btn" />
			</div>
			<div className="button-next">
				<FiArrowRight className="right-btn" />
			</div>
		</Swiper>
	);
};

export default Carousel;
