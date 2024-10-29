import AddMoviesForms from "@/components/admin components/AddMoviesForms";

import "./addMovies.css"

const AddMoviesPage = () => {
	return (
		<main className="add-movie-container h-auto w-full p-5 flex justify-center items-center">
			<AddMoviesForms />
		</main>
	);
};

export default AddMoviesPage;
