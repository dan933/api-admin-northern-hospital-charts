    const patients = require("../controllers/patient.controller.js");
    let router = require("express").Router();

  // Retrieve a single Patient with id
  router.get("/id/:id", patients.findOne);

  //Filter Patients based on patient detail columns
  router.get("/filter/:sort/:ascDesc", patients.filter);

  module.exports = router


// module.exports = app => {
//   const patients = require("../controllers/patient.controller.js");
//   const overview = require("../controllers/overview.controller.js");

//   let router = require("express").Router();

// // Retrieve a single Patient with id
// router.get("/id/:id", patients.findOne);

// //Filter Patients based on patient detail columns
// router.get("/filter/:sort/:ascDesc", patients.filter);
// //endpoint URL http://localhost:3000/api/patients/filter/patienthospitalnumber/ASC?searchpatienthospitalnumber=&searchtitle=&searchsurname=&searchfirstname=&searchgender=&searchdob=&searchaddress=&searchsuburb=&searchpostcode=&searchemail=&searchcountryofbirth=&searchprefferedlanguage=&searchlivesalone=&size=10

// //Get an overview of all patients
// router.get("/overview/:sort/:ascDesc", overview.find);

// //Get an overview of all single patient
// router.get("/overview/id/:id", overview.findPatient);
// };