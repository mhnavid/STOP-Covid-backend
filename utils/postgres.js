const { Sequelize } = require('sequelize');
const dbConfig      = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.cameraData = require("../models/cameraData.model")(sequelize, Sequelize);
db.userData   = require("../models/userData.model")(sequelize, Sequelize);

module.exports = db;