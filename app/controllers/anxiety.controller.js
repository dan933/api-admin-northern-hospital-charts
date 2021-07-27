const { text } = require("express");
const { sequelize } = require("../models");
const db = require("../models");

//pagination module
const pagination = require("../services/pagination");

const Anxiety = db.anxiety;
const Op = db.Sequelize.Op;

exports.find = ( req, res) => {

    const sort = req.params.sort;
    const ascDesc = req.params.ascDesc === 'true' ? 'ASC':'DESC';

    const { startDate } = req.query;

    const id = req.params.id;

    const endDate = "2025-06-09"
    // const endDate = new Date (Date.now());
    // console.log(endDate.toISOString())

    //select replaced by everycolumn
    const columnArray = ['d1','d2','d3','d4','d5','d6','d7','d8','a1','a2','a3','a4','a5','a6','a7','a8','questionare_date']

    Anxiety.findAll({
        attributes:columnArray,
        where: {
            [Op.and]:[
                {'patienthospitalnumber_id': {[Op.eq]: id}},
                {'questionare_date': {[Op.between]: [startDate, endDate ]}}
            ]
                       
        },
        order:[
            [sort,ascDesc]
        ],
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
    
};