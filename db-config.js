const dotenv = require('dotenv');
dotenv.config();
const Pool = require('pg').Pool
exports.pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
})