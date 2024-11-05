const bcrypt = require('bcryptjs');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const User = sequelize.define('users', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		name: DataTypes.STRING,
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		
		status: {
			type: DataTypes.STRING,
			allowNull: true
		},
		notes: {
			type: DataTypes.DATE,
			allowNull:true
		}
  	}
);

module.exports = User;