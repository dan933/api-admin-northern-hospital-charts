const db = require("../models");

//pagination module
const pagination = require("../services/pagination");

const Overview = db.overview;
const Op = db.Sequelize.Op;

// Retrieve an overview for all patients
exports.findAll = (req, res) => {
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