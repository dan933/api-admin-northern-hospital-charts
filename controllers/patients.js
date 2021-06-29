//Gets Database configuration from db-config.js
const { request, response } = require('express')
let db = require('../db-config')


// A SQL query that gets all patients from the SQL Database and displays the data in a Json format.
const patients = (request, response) => {
    db.pool.query('SELECT * FROM patients', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

//get patient by id
const getPatientById = (request, response) => {
    const id = parseInt(request.params.id)

    db.pool.query(`SELECT * FROM patients WHERE patienthospitalnumber = ${id}`, (error,results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// test endpoint
const test = (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  };

  module.exports = {patients, test, getPatientById};