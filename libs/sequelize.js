const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('./../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: console.log, //para que cada vez que se haga una consulta nos muestre exactamente lo que hace en consola
});

setupModels(sequelize);
// sequelize.sync({force: true});
sequelize.sync();


module.exports = sequelize;
