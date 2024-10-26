import { Movie } from "@/utils/types";
import MoviesColumn from "@/components/home/MoviesColumn";

import "./moviePage.css";

const movies: Movie[] = [];

interface MoviesPageProps {
	params: { pageTitle: string };
}

const MoviesPage = ({ params }: MoviesPageProps) => {
	/**
	gets all movies depending on the params passed wether to get the shown movies or the upcoming movies
	 */

	return (
		<div className="movies-container">
			<div className="page-title">
				<p>{params.pageTitle.replace("-", " ")}</p>
			</div>
			<div className="movies-column">
				{movies.map((movie, index) => (
					<>
						{/* <MoviesColumn movie={movie} /> */}
						{index < movies.length - 1 && <hr className="dashed" />}
					</>
				))}
			</div>
		</div>
	);
};

export default MoviesPage;
