const { request } = require('express');
const express = require('express');
const router = express.Router();

const patientsController = require('../controllers/patients');

router.get('/patients',patientsController.patients);


router.get('/patients/:id', patientsController.getPatientById)

router.get('/test',patientsController.test);

module.exports = router;
