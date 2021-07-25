    const patients = require("../controllers/patient.controller.js");
    let router = require("express").Router();

  // Retrieve a single Patient with id all Information
  router.get("/id/:id", patients.findOne);

  //Get Patient Name
  router.get("/name/id/:id", patients.getName)

  //Filter Patients based on patient detail columns
  router.get("/filter/:sort/:ascDesc", patients.filter);

  module.exports = router


//endpoint URL
// http://localhost:3000/api/patients/filter/patienthospitalnumber/ASC?searchpatienthospitalnumber=&searchtitle=&searchsurname=&searchfirstname=&searchgender=&searchdob=&searchaddress=&searchsuburb=&searchpostcode=&searchemail=&searchcountryofbirth=&searchprefferedlanguage=&searchlivesalone=&size=10
