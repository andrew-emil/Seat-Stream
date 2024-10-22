import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Movie } from "@/utils/types";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useRouter } from "next/navigation";

import "@/app/home.css"
import "swiper/css/pagination";

const Carousel = (movie: Movie[]) => {
    const router = useRouter();
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
			onSlideChange={() => console.log("slide change")}>
			{movie.map((slide, index) => (
				<SwiperSlide
					key={index}
					className="slide-inner"
					onClick={() => {
						// navigate("/MovieDetail", {
						// 	state: {
						// 		movie: movies[index],
						// 	},
						// });
					}}>
					<img src={slide.poster} alt={slide.title} />
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
