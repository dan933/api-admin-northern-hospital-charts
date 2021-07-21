const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Overview = sequelize.define("overview", {
    patienthospitalnumber:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    surname: {
        type:Sequelize.STRING,
        allowNull: false
    },

    firstname: {
        type:Sequelize.STRING,
        allowNull: false
    },
	painmeasure:{
		type:Sequelize.INTEGER
		},
		question_id:{
		type:Sequelize.INTEGER
		},
	d1:{
		type:Sequelize.INTEGER
		},
	d2:{
		type:Sequelize.INTEGER
		}
    },
    {
        freezeTableName: true
    });
    return Overview;
};