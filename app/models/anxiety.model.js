const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Anxiety = sequelize.define("anxiety", {
        patienthospitalnumber_id: {
            type: Sequelize.INTEGER,
            allowNull: true            
        },
        
        d1:{
            type: Sequelize.INTEGER,
            allowNull: true
        },
        d2:{
            type:Sequelize.INTEGER,
            allowNull: true
        },
        d3:{
            type:Sequelize.INTEGER,
            allowNull: true
        },
        d4:{
            type:Sequelize.INTEGER,
            allowNull: true
        },
        d5:{
            type:Sequelize.INTEGER,
            allowNull: true
        },
        d6:{
            type:Sequelize.INTEGER,
            allowNull: true
        },
        d7:{
            type:Sequelize.INTEGER,
            allowNull: true
        },
        d8:{
            type:Sequelize.INTEGER,
            allowNull: true
        },        
        a1:{
            type:Sequelize.INTEGER,
            allowNull: true
        },
        a2:{
            type:Sequelize.INTEGER,
            allowNull: true
        },
        a3:{
            type:Sequelize.INTEGER,
            allowNull: true
        },
        a4:{
            type:Sequelize.INTEGER,
            allowNull: true
        },
        a5:{
            type:Sequelize.INTEGER,
            allowNull: true
        },
        a6:{
            type:Sequelize.INTEGER,
            allowNull: true
        },
        a7:{
            type:Sequelize.INTEGER,
            allowNull: true
        },
        a8:{
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
    return Anxiety;
};