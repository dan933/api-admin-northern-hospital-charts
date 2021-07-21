const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Anxiety = sequelize.define("anxiety", {
        d1:{
            type:Sequelize.INTEGER,
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





// module.exports = (sequelize, Sequelize) => {
//     const Patient = sequelize.define("patient", {
        
//         patienthospitalnumber:{
//             type:Sequelize.INTEGER,
//             primaryKey: true,
//             autoIncrement: true
//         },
    
//         title: {
//             type:Sequelize.STRING,
//             allowNull: true
//         },
    
//         surname: {
//             type:Sequelize.STRING,
//             allowNull: false
//         },
    
//         firstname: {
//             type:Sequelize.STRING,
//             allowNull: false
//         },
    
//         gender: {
//             type:Sequelize.STRING,
//             allowNull: true
//         },
//         dob: {
//             type:Sequelize.DATEONLY,
//             allowNull: false
//         },
    
//         address: {
//             type:Sequelize.STRING,
//             allowNull: true
//         },
    
//         suburb: {
//             type:Sequelize.STRING,
//             allowNull: true
//         },
    
//         postcode: {
//             type:Sequelize.STRING,
//             allowNull: true
//         },
    
//         email: {
//             type:Sequelize.STRING,
//             allowNull: true
//         },
    
//         countryofbirth: {
//             type:Sequelize.STRING,
//             allowNull: true
//         },
    
//         preferredlanguage: {
//             type:Sequelize.STRING,
//             allowNull: true
//         },
    
//         livesalone: {
//             type:Sequelize.BOOLEAN,
//             allowNull: false
//         }
//     });

//     return Patient;
// };