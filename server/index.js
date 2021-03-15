// Dependencies + middleware
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');

// DB + port + router
const db = require('../db/index.js');
const router = require('./routes.js');
const port = 3000;

const server = express()
  .use(cors())
  .use(morgan('dev'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use('/api', router)
  .use(express.static(path.join(__dirname, '../dist/')))

server.listen(port, () => console.log(`Listening on port ${port}`));