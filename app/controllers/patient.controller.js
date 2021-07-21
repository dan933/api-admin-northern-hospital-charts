const { patients, sequelize } = require("../models");
const db = require("../models");

//pagination module
const pagination = require("../services/pagination");

const Patient = db.patients;
const Op = db.Sequelize.Op;


//Search base on column filters
exports.filter = ( req, res ) => {
  const { page, size } = req.query;
  const sort = req.params.sort;
  const ascDesc = req.params.ascDesc === 'true' ? 'ASC':'DESC';

  let { 
        searchpatienthospitalnumber, searchtitle, searchsurname, searchfirstname,
        searchgender, searchdob, searchaddress, searchsuburb, searchpostcode, 
        searchemail, searchcountryofbirth, searchprefferedlanguage, searchlivesalone
      } = req.query;

  const { limit, offset } = pagination.getPagination( page, size );

  const columnArray = [
    'patienthospitalnumber', 'title', 'surname', 'firstname', 'gender',
     'dob', 'address', 'suburb', 'postcode', 'email', 'countryofbirth',
    'preferredlanguage','livesalone' ]
  
  Patient.findAndCountAll({
    attributes: columnArray,
    where:{
      [Op.and]:[
        //source https://stackoverflow.com/questions/47212187/sequelize-cast-column-to-integer-in-where-clause
        sequelize.where(
          sequelize.cast(sequelize.col('patienthospitalnumber'),'varchar'),
          {[ Op.iLike]:`${searchpatienthospitalnumber}%`}
        ),
        { 'title': {[Op.iLike]: `${searchtitle}%`}},
        { 'surname': {[Op.iLike]: `${searchsurname}%`}},
        { 'firstname': {[Op.iLike]: `${searchfirstname}%`}},
        {'gender': {[Op.iLike]: `${searchgender}%`}},
        sequelize.where(
          sequelize.cast(sequelize.col('dob'),'varchar'),
          {[Op.iLike]: `${searchdob}%`}
        ),        
        { 'address': {[Op.iLike]: `${searchaddress}%`}},
        { 'suburb': {[Op.iLike]: `${searchsuburb}%`}},
        sequelize.where(
          sequelize.cast(sequelize.col('postcode'),'varchar'),
          {[Op.iLike]: `${searchpostcode}%`}
        ),        
        { 'email': {[Op.iLike]: `${searchemail}%`}},
        { 'countryofbirth': {[Op.iLike]: `${searchcountryofbirth}%`}},
        { 'preferredlanguage': {[Op.iLike]: `${searchprefferedlanguage}%`}},
        sequelize.where(
          sequelize.cast(sequelize.col('livesalone'),'varchar'),
          {[Op.iLike]: `${searchlivesalone}%`}
        )
      ]
    },
    order:[
      [sort,ascDesc]
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

//Search by id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Patient.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Patient with id=" + id
        });
      });
  };
