const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
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
    }
}, {
    timestamps: false // 不需要 createdAt 和 updatedAt 列
});

module.exports = User;