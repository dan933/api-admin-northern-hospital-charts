const { text } = require("express");
const { sequelize } = require("../models");
const db = require("../models");

//pagination module
const pagination = require("../services/pagination");

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

exports.filter = (req, res) => {
    const { page, size } = req.query;
    const sort = req.params.sort;
    const ascDesc = req.params.ascDesc === 'true' ? 'ASC':'DESC';
    const { startDate, endDate } = req.query;
    const id = req.params.id;

    const {searchpainmeasure} = req.query;

    const { limit, offset } = pagination.getPagination( page, size );

    const columnArray = ['questionare_date','painmeasure']

    PainMeasure.findAndCountAll({
        attributes:columnArray,
        where:{
            [Op.and]:[
                {'patienthospitalnumber_id': {[Op.eq]: id}},
                {'questionare_date': {[Op.between]: [startDate, endDate ]}},
                sequelize.where(
                    sequelize.cast(sequelize.col('painmeasure'),'varchar'),
                    {[Op.iLike]:`${searchpainmeasure}%`}
                )
            ],            
        },
        order:[
            [sort, ascDesc]
        ],
        limit,
        offset
    })
    .then(data => {
        const response = pagination.getPagingData(data,page,limit);
        res.send(response);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error occurred while retrieving data."
        });
    })
}