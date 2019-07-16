/**
 * Copyright © 2016-present Kriasoft.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-env jest */

const express = require('express');
const router = express.Router();
var mysql = require('mysql');
var cors = require('cors');
var app = express();
app.use(cors());
var pool = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: "root",
    password: "root",
    database: "frogmen"
});


var handle_database = ((req, res) => {
    // Connection will be acquired automatically
    pool.query(req, (err, rows) => {
        if (err) {
            return res.json({
                'error': true,
                'message': `Error occurred${err}`
            });
        } else {
            // Connection will be released as well.
            res.status(200).json(rows);
        }
    })
});


router.get("/getCities", function (req, res) {
    let sqlQuery = "SELECT * FROM cities LIMIT 100";
    handle_database(sqlQuery, res);
});


module.exports = router;