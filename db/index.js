const mysql = require('mysql');
const config = require('./config.js');
const runSeed = require('./seed.js');

const connection = mysql.createConnection(config);
connection.connect(() => console.log(`Connected to ${config.database}`));

runSeed(connection);