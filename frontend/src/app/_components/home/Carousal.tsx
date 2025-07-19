"use client";

import React, { use } from "react";
import { useRouter } from "next/navigation";
import { MovieDto } from "@/app/dtos/movieDto";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { convertImage } from "@/app/utils/convertImage";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { getPopularMovies } from "@/app/services/moviesApis";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./carousal.css";

function Carousal() {
  const router = useRouter();

  function handleSlideClick(movieId: string) {
    router.push(`/movie/${movieId}`);
  }

  const movies: MovieDto[] = use(getPopularMovies());

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
      speed={2000}
      slidesPerView={3}
      effect="autoplay"
    >
      {movies.map((movie) => {
        const convertedImage = convertImage(movie.poster.data);
        return (
          <SwiperSlide
            key={movie._id}
            className="swiper-slide swiper-cards"
            onClick={() => handleSlideClick(movie._id)}
          >
            <div className={"relative"}>
              <Image
                src={convertedImage}
                alt={movie.title}
                fill
                objectFit={"cover"}
                className="cursor-pointer relative"
                quality={85}
              />
            </div>
          </SwiperSlide>
        );
      })}
      <div className="button-prev">
        <KeyboardArrowLeftIcon className="left-btn" />
      </div>
      <div className="button-next">
        <KeyboardArrowRightIcon className="right-btn" />
      </div>
    </Swiper>
  );
}

export default Carousal;
