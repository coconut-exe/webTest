const { sequelize, DataTypes } = require('../database');

// 定义用户模型
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
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

// 同步模型到数据库
sequelize.sync({ force: true }).then(() => {
    console.log('数据库已同步');
}).catch((error) => {
    console.error('无法同步数据库:', error);
});

module.exports = User;