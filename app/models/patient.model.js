const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Patient = sequelize.define("patient", {
        
        patienthospitalnumber:{
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    
        title: {
            type:Sequelize.STRING,
            allowNull: true
        },
    
        surname: {
            type:Sequelize.STRING,
            allowNull: false
        },
    
        firstname: {
            type:Sequelize.STRING,
            allowNull: false
        },
    
        gender: {
            type:Sequelize.STRING,
            allowNull: true
        },
        dob: {
            type:Sequelize.DATEONLY,
            allowNull: false
        },
    
        address: {
            type:Sequelize.STRING,
            allowNull: true
        },
    
        suburb: {
            type:Sequelize.STRING,
            allowNull: true
        },
    
        postcode: {
            type:Sequelize.STRING,
            allowNull: true
        },
    
        email: {
            type:Sequelize.STRING,
            allowNull: true
        },
    
        countryofbirth: {
            type:Sequelize.STRING,
            allowNull: true
        },
    
        preferredlanguage: {
            type:Sequelize.STRING,
            allowNull: true
        },
    
        livesalone: {
            type:Sequelize.BOOLEAN,
            allowNull: false
        }
    });

    return Patient;
};