import Container from "@mui/material/Container";
import { Suspense } from "react";
import Carousal from "@/app/_components/home/Carousal";
import { CircularProgress } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import MovieGrid from "@/app/_components/home/MovieGrid";
import { CustomButton } from "@/app/_components/StyledComponents";

import "./styles/globals.css";

export default function Home() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "auto",
        padding: 0,
      }}
    >
      <section className="w-full h-full flex-1 justify-center">
        <Suspense fallback={<CircularProgress color="secondary" />}>
          <Carousal />
        </Suspense>
      </section>
      <br />
      <section className="flex-1 w-full my-8">
        <div>
          <Typography className="section-title" variant="h5">
            What&aposs on
          </Typography>
        </div>
        <br />
        <Suspense fallback={<CircularProgress color={"secondary"} />}>
          <MovieGrid />
        </Suspense>
        <Link href="/movies/what's-on">
          <CustomButton>View all movies</CustomButton>
        </Link>
      </section>
    </Container>
  );
}
