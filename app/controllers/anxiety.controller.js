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
    const columnArray = ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'questionare_date']

    Anxiety.findAndCountAll({
        attributes:columnArray,
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