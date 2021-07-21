const anxiety = require("../controllers/anxiety.controller.js")

let router = require("express").Router();

//Get an overview of all patients
router.get("/find/id/:id", anxiety.find);

// http://localhost:3000/api/anxietydepression/find/id/1?page=0&size=10

module.exports = router;