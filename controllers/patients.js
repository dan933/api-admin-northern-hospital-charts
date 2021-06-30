//Gets Database configuration from db-config.js
const { request, response, urlencoded } = require('express')
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
let getPatientById = (req, res) => {

    //Convert to Number
    let id = parseInt(req.params.id)

    //error check for NaN values
    if (isNaN(id)) {id = 0}

    //Run Query
    db.pool.query(`SELECT * FROM patients WHERE patienthospitalnumber = ${id};`, (error,results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

//search for patient by name
const searchPatient =  (req, res) => {
  const name = req.params.name

  db.pool.query(`SELECT * FROM patients WHERE (firstname||' '||surname) LIKE '%${name}%' ORDER BY surname;`,
   (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  });
  
  
}

//TODO error checking

//TODO pagination
//https://bezkoder.com/node-js-pagination-postgresql/

// test endpoint
const test = (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  };

  module.exports = {
    patients, test, 
    getPatientById,
    searchPatient
};