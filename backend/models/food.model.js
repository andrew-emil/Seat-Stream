const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("cinema", "root", "", {
	host: "localhost",
	dialect: "mysql",
});

const foodModel = sequelize.define(
	"food_drinks",
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		category_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		price: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		photo: {
			type: DataTypes.TEXT,
			allowNull: true, // Photo can be null
		},
	},
	{
		timestamps: false, // Disable createdAt and updatedAt if not needed
        createdAt: false,
		updatedAt: false,
	}
);

module.exports = foodModel;