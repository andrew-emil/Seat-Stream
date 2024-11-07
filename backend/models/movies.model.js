const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASENAME, process.env.DB_USER, "", {
	host: process.env.HOST,
	dialect: "mysql",
});

const moviesModel = sequelize.define(
	"movies",
	{
		movie_id: {
			type: DataTypes.UUID,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
		},
		trailer: {
			type: DataTypes.TEXT,
			allowNull: true,
			defaultValue: null,
		},
		running_time: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: null,
		},
		story: {
			type: DataTypes.TEXT,
		},
		language: {
			type: DataTypes.STRING,
		},
		poster: {
			type: DataTypes.TEXT,
		},
		release_date: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: null,
		},
		now_showing: {
			type: DataTypes.BOOLEAN,
		},
		starring: {
			type: DataTypes.TEXT,
		},
		director: {
			type: DataTypes.TEXT,
		},
	},
	{
		createdAt: false,
		updatedAt: false,
	}
);

module.exports = moviesModel