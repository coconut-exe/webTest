// models/Click.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const Click = sequelize.define('Click', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    clickCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
}, {
    timestamps: true,
});

module.exports = Click;