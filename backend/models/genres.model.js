const DataTypes = require('sequelize')
const { sequelize } = require("../config/db.ts");


const genresModel = sequelize.define(
	"genres",
	{
		genre_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		genre_name: {
			type: DataTypes.STRING,
			unique: true,
		},
	},
	{
		createdAt: false,
		updatedAt: false,
	}
);

module.exports = genresModel;
