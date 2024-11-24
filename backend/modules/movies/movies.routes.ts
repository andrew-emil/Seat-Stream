import { Router } from "express";
import { authUser, authorizeRole } from "../../middlewares/auth";
import multer from "multer";


const getAllMovies = require("./controllers/getAllMovies");
const getAllGenres = require("./controllers/getMoviesGenres");
const addMovie = require("./controllers/addMovie");
const getPopularMovies = require("./controllers/getPopularMovies");

const moviesRoutes = Router();
const upload = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 5 * 1024 * 1024 },
});

//routes
moviesRoutes.get("/popularmovies", getPopularMovies);

//middleware
moviesRoutes.use(authUser, authorizeRole(true));

//protected routes
moviesRoutes.get("/allmovies", getAllMovies);
moviesRoutes.get("/genres", getAllGenres);
moviesRoutes.post("/addmovie", upload.single("poster"), addMovie);

export default moviesRoutes;