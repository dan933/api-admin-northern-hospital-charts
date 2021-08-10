const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const PainMeasure = sequelize.define("painmeasure", {
        patienthospitalnumber_id: {
            type: Sequelize.INTEGER,
            allowNull: true            
        },
        questionare_date: {
            type:Sequelize.DATE,
            allowNull: false
        },
        painmeasure: {
            type:Sequelize.INTEGER,
            allowNull: true
        }
        
        
    },
    {
        freezeTableName: true
    });
    return PainMeasure;
};