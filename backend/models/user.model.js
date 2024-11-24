const {  DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.ts");


const userModel = sequelize.define(
	"users",
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		phone_no: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: true,
		},
		is_admin: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
            defaultValue: false
		},
	},
	{
        createdAt: false,
        updatedAt: false,
    }
);

module.exports = userModel;
