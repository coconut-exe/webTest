const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('click_counter', 'SD540', 'bugeth2004!!!', {
  host: 'rm-bp1c72khwizdsi137qo.mysql.rds.aliyuncs.com',
  dialect: 'mysql'
});

const Click = sequelize.define('Click', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  click_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  timestamps: false
});

sequelize.sync()
  .then(() => console.log('Database & tables created!'))
  .catch(err => console.error('Unable to connect to the database:', err));

module.exports = { sequelize, Click };