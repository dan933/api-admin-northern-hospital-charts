const painMeasure = require("../controllers/painMeasure.controller.js")

let router = require("express").Router();

router.get("/find/:sort/:ascDesc/id/:id",painMeasure.find);
//url example
// http://localhost:3000/api/painmeasure/find/questionare_date/true/id/2?startDate=2000-01-01&endDate=2022-01-01

router.get("/filter/:sort/:ascDesc/id/:id", painMeasure.filter);
http://localhost:3000/api/painmeasure/filter/questionare_date/false/id/3?startDate=Thu%20Aug%2006%202020%2015:52:54%20GMT+1000%20(Australian%20Eastern%20Standard%20Time)&endDate=Fri%20Aug%2006%202021%2015:52:54%20GMT+1000%20(Australian%20Eastern%20Standard%20Time)&searchpainmeasure=


// router.get("/download/:id", anxiety.download);
// //http://localhost:3000/api/anxietydepression/download/3?startDate=2021-06-16&endDate=2021-06-17

module.exports = router;
