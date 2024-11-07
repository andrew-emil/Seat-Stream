import { Router } from 'express'
const getAllMovies = require('./controllers/getAllMovies')
const getSpecificMovies = require('./controllers/getSpecificMovies')
const getRecommendedMovies = require('./controllers/moviesRecommendation')


const moviesRoutes = Router()

moviesRoutes.get('/allmovies', getAllMovies)
moviesRoutes.get('/specificmovies', getSpecificMovies)
moviesRoutes.get('/recommendedmovies', getRecommendedMovies)

export default moviesRoutes