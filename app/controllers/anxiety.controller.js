const { text } = require("express");
const { sequelize } = require("../models");

const db = require("../models");

//pagination module
const pagination = require("../services/pagination");

const Anxiety = db.anxiety;
const Op = db.Sequelize.Op;

const CsvParser = require("json2csv").Parser;



//function for anxiety graphs data
exports.find = ( req, res) => {

    const sort = req.params.sort;
    const ascDesc = req.params.ascDesc === 'true' ? 'ASC':'DESC';

    const { startDate, endDate } = req.query;

    const id = req.params.id;
   
    //select replaced by everycolumn
    const columnArray = ['d1','d2','d3','d4','d5','d6','d7','d8','a1','a2','a3','a4','a5','a6','a7','a8','questionare_date']

    Anxiety.findAll({
        attributes:columnArray,
        where: {
            [Op.and]:[
                {'patienthospitalnumber_id': {[Op.eq]: id}},
                {'questionare_date': {[Op.between]: [`${startDate} 00:00:00 +00:00`, `${endDate} 00:00:00 +00:00`]}}
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

//function for anxiety table data
exports.filter = (req, res) => {
    const { page, size } = req.query;
    const sort = req.params.sort;
    const ascDesc = req.params.ascDesc === 'true' ? 'ASC':'DESC';
    const { startDate, endDate } = req.query;
    const id = req.params.id;

    const {searchd1, searchd2, searchd3, searchd4, searchd5, searchd6, searchd7, searchd8, searcha1, searcha2, searcha3, searcha4, searcha5, searcha6, searcha7, searcha8} = req.query;

    const { limit, offset } = pagination.getPagination( page, size );

    const columnArray = ['questionare_date','d1','d2','d3','d4','d5','d6','d7','d8','a1','a2','a3','a4','a5','a6','a7','a8']

    Anxiety.findAndCountAll({
        attributes:columnArray,
        where:{
            [Op.and]:[
                {'patienthospitalnumber_id': {[Op.eq]: id}},
                {'questionare_date': {[Op.between]: [`${startDate} 00:00:00 +00:00`, `${endDate} 00:00:00 +00:00` ]}},
                sequelize.where(
                    sequelize.cast(sequelize.col('d1'),'varchar'),
                    {[Op.iLike]:`${searchd1}%`}
                ),
                sequelize.where(
                    sequelize.cast(sequelize.col('d2'),'varchar'),
                    {[Op.iLike]:`${searchd2}%`}
                ),
                sequelize.where(
                    sequelize.cast(sequelize.col('d3'),'varchar'),
                    {[Op.iLike]:`${searchd3}%`}
                ),
                sequelize.where(
                    sequelize.cast(sequelize.col('d4'),'varchar'),
                    {[Op.iLike]:`${searchd4}%`}
                ),
                sequelize.where(
                    sequelize.cast(sequelize.col('d5'),'varchar'),
                    {[Op.iLike]:`${searchd5}%`}
                ),
                sequelize.where(
                    sequelize.cast(sequelize.col('d6'),'varchar'),
                    {[Op.iLike]:`${searchd6}%`}
                ),
                sequelize.where(
                    sequelize.cast(sequelize.col('d7'),'varchar'),
                    {[Op.iLike]:`${searchd7}%`}
                ),
                sequelize.where(
                    sequelize.cast(sequelize.col('d8'),'varchar'),
                    {[Op.iLike]:`${searchd8}%`}
                ),
                sequelize.where(
                    sequelize.cast(sequelize.col('a1'),'varchar'),
                    {[Op.iLike]:`${searcha1}%`}
                ),
                sequelize.where(
                    sequelize.cast(sequelize.col('a2'),'varchar'),
                    {[Op.iLike]:`${searcha2}%`}
                ),
                sequelize.where(
                    sequelize.cast(sequelize.col('a3'),'varchar'),
                    {[Op.iLike]:`${searcha3}%`}
                ),
                sequelize.where(
                    sequelize.cast(sequelize.col('a4'),'varchar'),
                    {[Op.iLike]:`${searcha4}%`}
                ),
                sequelize.where(
                    sequelize.cast(sequelize.col('a5'),'varchar'),
                    {[Op.iLike]:`${searcha5}%`}
                ),
                sequelize.where(
                    sequelize.cast(sequelize.col('a6'),'varchar'),
                    {[Op.iLike]:`${searcha6}%`}
                ),
                sequelize.where(
                    sequelize.cast(sequelize.col('a7'),'varchar'),
                    {[Op.iLike]:`${searcha7}%`}
                ),
                sequelize.where(
                    sequelize.cast(sequelize.col('a8'),'varchar'),
                    {[Op.iLike]:`${searcha8}%`}
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


//function to download anxiety data as csv
exports.download = (req, res ) => {

    const id = req.params.id;
    const { startDate, endDate } = req.query;

    
    const columnArray = ['questionare_date','d1','d2','d3','d4','d5','d6','d7','d8','a1','a2','a3','a4','a5','a6','a7','a8']

    Anxiety.findAll({
        attributes:columnArray,
        where:{
            [Op.and]:[
                {'patienthospitalnumber_id': {[Op.eq]: id}},
                {'questionare_date': {[Op.between]: [`${startDate} 00:00:00 +00:00`, `${endDate} 00:00:00 +00:00`]}}
            ],            
        },
        order:[
            ['questionare_date', 'DESC']
        ]
    })
    .then((objs) => {
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
        const { questionare_date, d1 , d2, d3, d4 , d5, d6, d7, d8, a1, a2, a3, a4, a5, a6, a7, a8 } = obj;
        data.push({ questionare_date, d1 , d2, d3, d4 , d5, d6, d7, d8, a1, a2, a3, a4, a5, a6, a7, a8 });
    }); 

    
    const csvParser = new CsvParser({ columnArray });
    const csvData = csvParser.parse(data);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=anxietyTable.csv");

    res.status(200).end(csvData);
    
    });

};

