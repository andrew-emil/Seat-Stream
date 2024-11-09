const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
	process.env.DATABASENAME,
	process.env.DB_USER,
	"",
	{
		host: process.env.HOST,
		dialect: "mysql",
	}
);

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
