const painMeasure = require("../controllers/painMeasure.controller.js")

let router = require("express").Router();

router.get("/find/:sort/:ascDesc/id/:id",painMeasure.find);

module.exports = router;

//url example
// http://localhost:3000/api/painmeasure/find/questionare_date/true/id/2?startDate=2000-01-01&endDate=2022-01-01