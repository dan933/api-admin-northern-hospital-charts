const db = require("../models");

const Patient = db.patients;
const Op = db.Sequelize.Op;

// Retrieve all Patients from the database.
exports.findAll = (req, res) => {
   Patient.findAll()
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

  exports.search = (req, res) => {
      const name = req.params.name;
      Patient.findAll({
        where:{
            [Op.or]:[
                {
                    firstname:{
                        [Op.like]: `${name}%`
                    }
                },
                {
                    surname:{
                        [Op.like]:`${name}%`
                    }
                }]
                
            }
        })
      .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error occurred while retrieving patients."
        });
    })
}