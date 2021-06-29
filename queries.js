//Gets Database configuration from db-config.js
let db = require('./db-config')

// A SQL query that gets all patients from the SQL Database and displays the data in a Json format.
const getPatients = (request, response) => {
    db.pool.query('SELECT * FROM patients', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  //Exports endpoints to other modules for use.
  module.exports = {
    getPatients
  }

