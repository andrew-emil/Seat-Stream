const getRecommendedMovies = async (req, res) => {
    const moviesModel = require('../../../models/movies.model')

    console.log(req.body)

    const {genre} = req.body

    if(!genre)
        throw "Something went wrong :("

    let recommendation = await moviesModel.findAll({
        where: {
            genre,
            now_showing : 1
        },
        
    })
    

    if(!recommendation || recommendation.length < 5){
        recommendation = await moviesModel.findAll({
            where: {
                now_showing : 1
            },
            limit: 10
        })
    }

    res.status(200).json({
        status: 'success',
        recommendedMovies : recommendation
    })
}

module.exports = getRecommendedMovies