// source: https://bezkoder.com/node-express-sequelize-postgresql/#Demo_Video
//https://bezkoder.com/node-js-pagination-postgresql/
const express = require("express");
const cors = require("cors");
var session = require('express-session');
var Keycloak = require('keycloak-connect');

const app = express();
app.use(express.json());

var corsOptions = {
  origin: "http://localhost:3000",
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

//source https://github.com/keycloak/keycloak-quickstarts/blob/latest/service-nodejs/app.js

// Create a session-store to be used by both the express-session
// middleware and the keycloak middleware.

var memoryStore = new session.MemoryStore();

app.use(session({
  secret: 'b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABlwAAAAdzc2gtcnNhAAAAAwEAAQAAAYEAxRe8q6ziXrXIBXFPUHDJHxv/xETwr2kFV/IJA4UiddI1Fs1803FKI09InH7XJFzNNKtGdcxfAOhTpVtp5VXGuMsi1KiCKGR0ww26A0x4kPcitPTcVoLIET7KCebzns/ErLCI8Vo7APqE',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

// Provide the session store to the Keycloak so that sessions
// can be invalidated from the Keycloak console callback.
//
// Additional configuration is read from keycloak.json file
// installed from the Keycloak web console.

var keycloak = new Keycloak({
  store: memoryStore
});


app.use(keycloak.middleware({
  logout:'/logout',
  admin:'/'
}));

const db = require("./app/models");
db.sequelize.sync();

// In development, you may need to drop existing tables and re-sync database. Just use force: true as following code:


// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
// simple route
app.get("/", keycloak.protect(), (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
app.use('/api/overview', keycloak.protect(), require('./app/routes/overview.routes'));
app.use('/api/patients', keycloak.protect(), require('./app/routes/patient.routes'));
app.use('/api/anxietydepression', keycloak.protect('realm:admin'), require('./app/routes/anxiety.routes'));
app.use('/api/painmeasure', keycloak.protect(), require('./app/routes/painmeasure.routes'));


// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});