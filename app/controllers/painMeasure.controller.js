const { text } = require("express");
const { sequelize, painmeasure } = require("../models");
const db = require("../models");

//pagination module
const pagination = require("../services/pagination");

//csv 
const CsvParser = require("json2csv").Parser;

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
                {'questionare_date': {[Op.between]: [`${startDate} 00:00:00 +00:00`, `${endDate} 00:00:00 +00:00` ]}}
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
                {'questionare_date': {[Op.between]: [`${startDate} 00:00:00 +00:00`, `${endDate} 00:00:00 +00:00`]}},
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

//function to download painmeasure data as csv
exports.download = (req, res ) => {

    const id = req.params.id;
    const { startDate, endDate } = req.query;

    const columnArray = ['questionare_date','painmeasure']

    PainMeasure.findAll({
        attributes:columnArray,
        where:{
            [Op.and]:[
                {'patienthospitalnumber_id': {[Op.eq]: id}},
                {'questionare_date': {[Op.between]: [`${startDate} 00:00:00 +00:00`, `${endDate} 00:00:00 +00:00` ]}}
            ],            
        },
        order:[
            ['questionare_date', 'DESC']
        ]
    })
    .then((objs) => {
        console.log(objs)
        let data = [];
        let date = '';

        //dates
        for( let row in objs)
        {
           objs[row].dataValues.questionare_date = new Date(objs[row].dataValues.questionare_date);
           date = objs[row].dataValues.questionare_date

            let day = date.getDate();
            day = String(day)
            day = day.length == 2 ? day : `0${day}`

            let month = date.getMonth();
            month = String(month + 1)
            month = month.length == 2 ? month : `0${month}`

            let year = date.getFullYear();

            objs[row].dataValues.questionare_date = `${day}-${month}-${year}`
        }
        
        objs.forEach((obj) => {
        const { questionare_date, painmeasure} = obj;
        data.push({ questionare_date, painmeasure});
    }); 

    const csvParser = new CsvParser({ columnArray });
    const csvData = csvParser.parse(data);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=painMeasure.csv");

    res.status(200).end(csvData);
    
    });

};