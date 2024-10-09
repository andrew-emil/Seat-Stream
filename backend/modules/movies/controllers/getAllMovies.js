const getAllMovies = async (_, res) => {
    const moviesModel = require("../../../models/movies.model")

    const moviesData = await moviesModel.findAll(
        {
            where:{
                now_showing : true
            }
        }
    )

    const upcomingMovies = await moviesModel.findAll(
        {
            where:{
                now_showing: false
            },
            limit: 5
        }
    )

    if(!moviesData)
        throw "Error loading movies"

    res.status(200).json({
        status: "success",
        data : {
            whatIsOn : moviesData,
            upcomingMovies
        }
    })
}

module.exports = getAllMovies