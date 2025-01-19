"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Movie } from "@/utils/types";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Image from "next/image";

import "@/app/home.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CarouselProps {
	movies: Movie[];
}

const Carousel = ({ movies }: CarouselProps) => {
	const router = useRouter();

	const handleSlideClick = (movie: Movie) => {
		router.push("/movieDetails" )
	};
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
			centeredSlides
			autoplay={{
				delay: 2500,
				disableOnInteraction: false,
			}}
			rewind
			speed={1000}
			slidesPerView={3}
			effect="autoplay">
			{movies.map((slide, index) => (
				<SwiperSlide
					className="slide-inner"
					key={index}
					onClick={() => handleSlideClick(slide)}>
					<Image
						src={slide.poster}
						alt={slide.title}
						layout="fill"
						objectFit="cover"
						className="cursor-pointer"
					/>
				</SwiperSlide>
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
