const anxiety = require("../controllers/anxiety.controller.js")

let router = require("express").Router();

//Get an overview of all patients
router.get("/find", anxiety.find);


module.exports = router;