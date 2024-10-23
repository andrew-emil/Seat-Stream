import { Movie } from "@/utils/types";
import MoviesColumn from "@/components/home/MoviesColumn";

import "../css/pages/moviesPage.css";

const movies: Movie[] = [];

interface MoviesPageProps {
	pageTitle: string;
}

const MoviesPage = ({ pageTitle }: MoviesPageProps) => {
    
	/**
	gets all movies depending on the params passed wether to get the shown movies or the upcoming movies
	 */

	return (
		<div className="movies-container">
			<div className="page-title">
				<p>{pageTitle}</p>
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
