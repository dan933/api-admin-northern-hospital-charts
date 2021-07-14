module.exports = app => {
    const patients = require("../controllers/patient.controller.js");
    const overview = require("../controllers/overview.controller.js");

    let router = require("express").Router();

    // Retrieve all Patients with detailed information DOB, address etc
  router.get("/", patients.findAll);

  // Retrieve a single Patient with id
  router.get("/id/:id", patients.findOne);

  //Search for patients
  router.get("/search/:name", patients.search);

  // //Get an overview of all patients
  // router.get("/overview/all", overview.find);

  //Get an overview of all patients
  router.get("/overview/all", overview.find);



  //Get an overview of all single patient
  router.get("/overview/id/:id", overview.findPatient);

  

  app.use('/api/patients', router);
};