const anxiety = require("../controllers/anxiety.controller.js")

let router = require("express").Router();

//Get an overview of all patients
router.get("/find/:sort/:ascDesc/id/:id", anxiety.find);

// http://localhost:3000/api/anxietydepression/find/questionare_date/true/id/7?startDate=2020-06-18T00:50:12.000Z&page=0&size=10

module.exports = router;