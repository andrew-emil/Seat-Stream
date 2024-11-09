import { Router } from 'express'
import { authUser, authorizeRole } from '../../middlewares/auth'

const getAllMovies = require('./controllers/getAllMovies')
const getSpecificMovies = require('./controllers/getSpecificMovies')
const getRecommendedMovies = require('./controllers/moviesRecommendation')
const getAllGenres = require("./controllers/getMoviesGenres")

const moviesRoutes = Router()

//routes
moviesRoutes.get('/specificmovies', getSpecificMovies)
moviesRoutes.get('/recommendedmovies', getRecommendedMovies)

//protected routes
moviesRoutes.get('/allmovies', authUser, authorizeRole(true), getAllMovies)
moviesRoutes.get("/genres", authUser, authorizeRole(true), getAllGenres);


export default moviesRoutes