import axiosClient from "@/app/services/axiosClient";
import { MovieDto } from "@/app/dtos/movieDto";

export async function getPopularMovies(): Promise<MovieDto[]> {
  try {
    const { data } = await axiosClient.get<MovieDto[]>("/movies/popular");
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getMoviesByNowShowing(
  nowShowing: boolean,
): Promise<MovieDto[]> {
  try {
    const { data } = await axiosClient.get<MovieDto[]>(
      `/movies/now-showing?nowShowing=${nowShowing}`,
    );
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
