// source: https://bezkoder.com/node-express-sequelize-postgresql/#Demo_Video
//https://bezkoder.com/node-js-pagination-postgresql/
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

var corsOptions = {
    origin: "http://localhost:3000"
  };

app.use(cors(corsOptions));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
  });

const db = require("./app/models");
db.sequelize.sync();

// In development, you may need to drop existing tables and re-sync database. Just use force: true as following code:


// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

require("./app/routes/patient.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});