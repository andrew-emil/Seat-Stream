"use client";

import React, { use, useState } from "react";
import { getMoviesByNowShowing } from "@/app/services/moviesApis";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { convertImage } from "@/app/utils/convertImage";
import Typography from "@mui/material/Typography";
import { CustomButton } from "@/app/_components/StyledComponents";

function MovieGrid() {
  const [showDetail, setShowDetail] = useState(false);
  const movies = use(getMoviesByNowShowing(true));
  const router = useRouter();

  function handleButtonClick(movieId: string) {
    router.push(`movie/${movieId}`);
  }

  return (
    <div className="grid gap-3.5 grid-cols-4 w-full">
      {movies.map((movie, index) => {
        const isPosterBigger = index === 0 || index === 9;
        return (
          <div
            key={movie._id}
            className={`relative overflow-hidden border-8 rounded-xl transition hover:transform scale-105 shadow-xl ${isPosterBigger ? "grid-cols-2 grid-rows-2" : ""}`}
            onMouseEnter={() => setShowDetail(true)}
            onMouseLeave={() => setShowDetail(false)}
          >
            <Image
              src={convertImage(movie.poster.data)}
              alt={movie.title}
              fill
              quality={75}
            />
            <div
              className={`absolute bottom-0 left-0 w-full h-full p-2.5 bg-background text-primary-50 transition ${showDetail ? "opacity-100" : "opacity-0"}`}
            >
              <Typography
                variant={"h3"}
                sx={{
                  marginTop: "2.5rem",
                  color: "#faf5ff",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                {movie.title}
              </Typography>
              {isPosterBigger && (
                <Typography
                  variant={"h5"}
                  sx={{
                    marginTop: "2.5rem",
                    fontSize: "1rem",
                    lineHeight: 1.5,
                    color: "#faf5ff",
                  }}
                >
                  {movie.description}
                </Typography>
              )}
            </div>
            <div
              className={"mt-2.5 flex flex-row justify-between gap-2 flex-1"}
            >
              <CustomButton onClick={() => handleButtonClick(movie._id)}>
                More Info
              </CustomButton>
              <CustomButton onClick={() => handleButtonClick(movie._id)}>
                Book Now
              </CustomButton>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MovieGrid;
