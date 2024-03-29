const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

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

  const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.patients = require("./patient.model.js")(sequelize, Sequelize);
db.overview = require("./overview.model.js")(sequelize,Sequelize);
db.anxiety = require("./anxiety.model.js")(sequelize,Sequelize);
db.painmeasure = require("./painmeasure.model.js")(sequelize, Sequelize);

module.exports = db;