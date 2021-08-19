const anxiety = require("../controllers/anxiety.controller.js")

let router = require("express").Router();


//Get an overview of all patients
router.get("/find/:sort/:ascDesc/id/:id", anxiety.find);

router.get("/filter/:sort/:ascDesc/id/:id", anxiety.filter);

//http://localhost:3000/api/anxietydepression/filter/questionare_date/false/id/3?startDate=2019-01-01&endDate=2021-01-01&searchd1=&searchd2=&searchd3=&searchd4=&searchd5=&searchd6=&searchd7=&searchd8=&searcha1=&searcha2=&searcha3=&searcha4=&searcha5=&searcha6=&searcha7=&searcha8=&page=0&size=10


router.get("/download/:id", anxiety.download);
//http://localhost:3000/api/anxietydepression/download/3?startDate=2019-06-16&endDate=2021-06-17

module.exports = router;