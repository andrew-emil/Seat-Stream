const getSpecificMovies = async (req, res) => {
    const moviesModel = require("../../../models/movies.model")

    const {now_showing} = req.query

    const movies = await moviesModel.findAll({
        where: {
            now_showing
        }
    })

    if(!movies)
        throw "No movies found"

    res.status(200).json({
        status: "success",
        movies
    })
}

module.exports = getSpecificMovies