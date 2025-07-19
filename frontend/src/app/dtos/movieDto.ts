import { CommonDto, ImageDto } from "@/app/dtos/commonDto";

export interface MovieDto extends CommonDto {
  title: string;
  description: string;
  trailer_url: string;
  now_showing: boolean;
  language: string;
  subtitle: string;
  poster: ImageDto;
  running_time: number;
  release_data: Date;
  starring: string[];
  director: string;
  createdAt: Date;
  genres: Genre[];
}

interface Genre extends CommonDto {
  name: string;
}
