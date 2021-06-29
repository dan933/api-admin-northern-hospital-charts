const express = require('express');
const routes = require('./routes/patients');
const app = express();
const port = 3000



// Presents data in json format
app.use(express.json());

//Router for controllers
app.use('/', routes);




app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })

  