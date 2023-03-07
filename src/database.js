const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
// when this variable is created, it equals nothing

dotenv.config();

//set up the connection details
const pool = mysql.createPool({

    host: process.env.host,
    user:process.env.user,
    password: process.env.password,
    database: process.env.database,
    port: process.env.database,
});

module.exports = pool;