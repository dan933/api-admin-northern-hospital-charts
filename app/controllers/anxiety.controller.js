const { text } = require("express");
const { sequelize } = require("../models");
const db = require("../models");

//pagination module
const pagination = require("../services/pagination");

const Anxiety = db.anxiety;
const Op = db.Sequelize.Op;

exports.find = ( req, res) => {

    const { page, size } = req.query;
    const { limit, offset } = pagination.getPagination( page, size );

    const { startDate } = req.query;

    const id = req.params.id;
    console.log(id)

    const endDate = "2020-07-30"
    // const endDate = new Date (Date.now());
    // console.log(endDate.toISOString())

    const columnArray = ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'questionare_date']

    Anxiety.findAndCountAll({
        attributes:columnArray,
        where: {
            [Op.and]:[
                {'patienthospitalnumber_id': {[Op.eq]: id}},
                {'questionare_date': {[Op.between]: [startDate, endDate ]}}
            ]
                       
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