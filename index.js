const express = require('express')
const app = express()
const port = 3000

//gets Database connection data and endpoint functions from queries.js
const db = require('./queries')

// Presents data in json format
app.use(express.json());

// test endpoint
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

//Gets all patients from database
app.get('/patients', db.getPatients)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })

  