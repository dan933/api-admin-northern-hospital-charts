const overview = require("../controllers/overview.controller.js");

let router = require("express").Router();

//Get an overview of all patients
router.get("/filter/:sort/:ascDesc", overview.filter);
//endpoint URL 
//http://localhost:3000/api/overview/filter/patienthospitalnumber/ASC?searchPatienthospitalnumber=&searchSurname=&searchFirstName=&searchQuestionId=&searchPainMeasure=&searchd1=&searchd2=&size=10

//Get an overview of all single patient
router.get("/id/:id", overview.findPatient);


module.exports = router;