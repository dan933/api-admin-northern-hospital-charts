module.exports = app => {
    const patients = require("../controllers/patient.controller.js");

    let router = require("express").Router();

    // Retrieve all Tutorials
  router.get("/", patients.findAll);

  // Retrieve a single Patient with id
  router.get("/id/:id", patients.findOne);

  router.get("/search/:name", patients.search);

  app.use('/api/patients', router);
};