const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    ads: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    social: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    visitCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

module.exports = User;