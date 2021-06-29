let db = require('./db-config')

const getUsers = (request, response) => {
    db.pool.query('SELECT * FROM patients', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  module.exports = {
    getUsers
  }

