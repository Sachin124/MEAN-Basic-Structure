// Get dependencies

/**
 * Copyright © 2016-present Kriasoft.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-env jest */

const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
// const api = require('./api/api');

// const employeeApi = require('./api/employee');

const frogmen = require('./api/frogmen');


// const mvc_moongoose = require('./api/controller/emp_controller.js');

var cors = require('cors')

var app = express()
app.use(cors())

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
// app.use('/api', api);
// app.use('/api', employeeApi)
app.use('/api', frogmen)

// app.use('/mvc_api',mvc_moongoose);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
