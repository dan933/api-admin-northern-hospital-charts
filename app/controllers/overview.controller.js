const { text } = require("express");
const { sequelize } = require("../models");
const db = require("../models");

//pagination module
const pagination = require("../services/pagination");

const Overview = db.overview;
const Op = db.Sequelize.Op;

// exports.find = (req, res) => {
//     const { page, size } = req.query;
//     const { limit, offset } = pagination.getPagination(page, size);
//     Overview.findAndCountAll({
//         attributes:['patienthospitalnumber', 'surname', 'firstname', 'question_id', 'painmeasure', 'd1', 'd2'],
//         limit,
//         offset
//     })
//     .then(data => {
//         const response = pagination.getPagingData(data, page, limit);
//         res.send(response);
//     })
//     .catch(err => {
//         res.status(500).send({
//             message:
//             err.message || "some error occurred while retrieving patients."
//         });
//     });
// };
exports.find = (req, res) => {
    const { page, size } = req.query;
    let {searchPatienthospitalnumber, searchSurname, searchFirstName, searchQuestionId, searchPainMeasure,searchd1,searchd2} = req.query;
    console.log(searchPatienthospitalnumber)
    const { limit, offset } = pagination.getPagination(page, size);

    const columnArray = ['patienthospitalnumber', 'surname', 'firstname', 'question_id', 'painmeasure', 'd1', 'd2']
    

    searchSurname = searchSurname === undefined ? '':searchSurname
    
    Overview.findAndCountAll({
        attributes:columnArray,
        where:{ 
            [Op.and]: [
                //source https://stackoverflow.com/questions/47212187/sequelize-cast-column-to-integer-in-where-clause
                sequelize.where(
                    sequelize.cast(sequelize.col('patienthospitalnumber'),'varchar'),
                    {[Op.iLike]:`${searchPatienthospitalnumber}%`}
                ),
                { 'surname':{[Op.iLike]:`${searchSurname}%` }},
                { firstname:{[Op.iLike]:`${searchFirstName}%` }},
                sequelize.where(
                    sequelize.cast(sequelize.col('question_id'),'varchar'),
                    {[Op.iLike]:`${searchQuestionId}%`}
                ),
                sequelize.where(
                    sequelize.cast(sequelize.col('painmeasure'),'varchar'),
                    {[Op.iLike]:`${searchPainMeasure}%`}
                ),
                sequelize.where(
                    sequelize.cast(sequelize.col('d1'),'varchar'),
                    {[Op.iLike]:`${searchd1}%`}
                ),
                sequelize.where(
                    sequelize.cast(sequelize.col('d2'),'varchar'),
                    {[Op.iLike]:`${searchd2}%`}
                )
            ]
        },
        order:[
            ['patienthospitalnumber','ASC']
        ],
        limit,
        offset
    })
    .then(data => {
        const response = pagination.getPagingData(data, page, limit);
        res.send(response);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error occurred while retrieving patients."
        });
    });
};

// Retrieve an overview for all patients
exports.findPatient = (req, res) => {
    const id = req.params.id;
    const { page, size } = req.query; 
    const { limit, offset } = pagination.getPagination(page, size);
    Overview.findAndCountAll({
        attributes:['patienthospitalnumber', 'surname', 'firstname', 'question_id', 'painmeasure', 'd1', 'd2'],
        where:{
            patienthospitalnumber:{[Op.eq]:id}
            },
        limit,
        offset
        })
   .then(data => {
     const response = pagination.getPagingData(data, page, limit);
       res.send(response);
   })
   .catch(err => {
       res.status(500).send({
           message:
           err.message || "some error occurred while retrieving patients."
       });
   });
 };