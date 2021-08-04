const { text } = require("express");
const { sequelize } = require("../models");
const db = require("../models");

const PainMeasure = db.painmeasure;
const Op = db.Sequelize.Op;

exports.find = ( req, res) => {
    const sort = req.params.sort;
    const ascDesc = req.params.ascDesc === 'true' ? 'ASC':'DESC';

    const { startDate, endDate } = req.query;

    const id = req.params.id;

    const columnArray = ['patienthospitalnumber_id', 'painmeasure','questionare_date']


    PainMeasure.findAll({
        attributes:columnArray,
        where: {
            [Op.and]: [
                {'patienthospitalnumber_id': {[Op.eq]: id}},
                {'questionare_date': {[Op.between]: [startDate, endDate]}}
            ]            
        },
        order: [
            [sort, ascDesc]
        ]
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error occurred while retrieving patients."
        });
    });
}