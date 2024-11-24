import { Model, ModelStatic } from "sequelize";
import { setupAssociations } from "../utils/setupAssociations";

const moviesModel: ModelStatic<Model> = require("./movies.model");
const genresModel: ModelStatic<Model> = require("./genres.model");
const MovieGenre: ModelStatic<Model> = require("./moviesGenres.model");


// Setup associations
setupAssociations(moviesModel, genresModel, MovieGenre);

export { moviesModel, genresModel, MovieGenre };
