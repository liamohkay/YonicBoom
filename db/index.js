const mysql = require('mysql');
const config = require('./config.js');

const connection = mysql.createConnection(config);
connection.connect(() => console.log(`Connected to ${config.database}`));