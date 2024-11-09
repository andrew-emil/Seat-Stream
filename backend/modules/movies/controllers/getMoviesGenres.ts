import { Response, Request } from "express";
import Model, { ModelStatic } from "sequelize/types/model";


const getAllGenres = async (req: Request, res:Response) => {
    const genresModel: ModelStatic<Model> = require("../../../models/genres.model.js");

    const genres = await genresModel.findAll();

    if(genres.length < 1 || !genres)
        throw "Error fetching genres"

    res.status(200).json({
        status: "success",
        genres
    })
}

module.exports = getAllGenres;