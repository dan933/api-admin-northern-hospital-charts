const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const PainMeasure = sequelize.define("painmeasure", {
        patienthospitalnumber_id: {
            type: Sequelize.INTEGER,
            allowNull: true            
        },

        painmeasure: {
            type:Sequelize.INTEGER,
            allowNull: true
        },

        questionare_date: {
            type:Sequelize.DATEONLY,
            allowNull: false
        }
    },
    {
        freezeTableName: true
    });
    return PainMeasure;
};