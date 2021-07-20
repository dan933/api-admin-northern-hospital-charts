const overview = require("../controllers/overview.controller.js");

let router = require("express").Router();

//Get an overview of all patients
router.get("/filter/:sort/:ascDesc", overview.filter);

//Get an overview of all single patient
router.get("/id/:id", overview.findPatient);


module.exports = router;




// module.exports = overview => {
//     const overview = require("../controllers/overview.controller.js");

//     let router = require("express").Router();

//   //Get an overview of all patients
//   router.get("filter/:sort/:ascDesc", overview.find);

//   //Get an overview of all single patient
//   router.get("/overview/id/:id", overview.findPatient);
// };