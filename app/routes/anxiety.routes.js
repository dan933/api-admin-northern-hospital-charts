const anxiety = require("../controllers/anxiety.controller.js")

let router = require("express").Router();

//Get an overview of all patients
router.get("/find/:sort/:ascDesc/id/:id", anxiety.find);
// http://localhost:3000/api/anxietydepression/find/questionare_date/true/id/7?startDate=2020-06-18T00:50:12.000Z&page=0&size=10

router.get("/filter/:sort/:ascDesc/id/:id", anxiety.filter);
//http://localhost:3000/api/anxietydepression/filter/questionare_date/false/id/3?startDate=Thu%20Aug%2006%202020%2015:52:54%20GMT+1000%20(Australian%20Eastern%20Standard%20Time)&endDate=Fri%20Aug%2006%202021%2015:52:54%20GMT+1000%20(Australian%20Eastern%20Standard%20Time)&searchd1=&searchd2=&searchd3=&searchd4=&searchd5=&searchd6=&searchd7=&searchd8=&searcha1=&searcha2=&searcha3=&searcha4=&searcha5=&searcha6=&searcha7=&searcha8=&page=0&size=10

router.get("/download/:id", anxiety.download);
//http://localhost:3000/api/anxietydepression/download/3?startDate=2021-06-16&endDate=2021-06-17

module.exports = router;