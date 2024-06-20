const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// 创建 Sequelize 实例并连接到数据库
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});

// 测试连接
sequelize.authenticate().then(() => {
    console.log('连接成功');
}).catch(err => {
    console.error('连接失败:', err);
});

module.exports = { sequelize, DataTypes };