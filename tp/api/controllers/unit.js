var env = require('../config/connection');
var connection = env.Dbconnection;
var md5 = require('md5');
var async = require('async');
var randtoken = require('rand-token');
const jwt = require('jsonwebtoken');
const sendmail = require("./sendmail");



// Created by: Sushant
// Created on: 21/06/2019
// Updated on: 

exports.addUnit = function (req, resp) {
  connection.query("select * from unit_master_ut where name = '" + req.body.name + "'", function (err, rows) {
    if (err) {
      console.log(err);
      resp.status(500).json({
        "status": 0,
        "message": "Something Went Wrong."
      });
    } else {
      if (rows.length > 0) {
        resp.status(200).json({
          "status": 0,
          "message": "unit is already exist."
        });
      } else {
        connection.query("insert into unit_master_ut (name, american_unit, metric_unit, conversion_factor, status, created_by, created_on) values ('" + req.body.name + "', '" + req.body.american_unit + "', '" + req.body.metric_unit + "', '" + req.body.conversion_factor + "', " + req.body.status + ", " + req.body.created_by + ", '" + Date.now() + "')", function (err1, rows1) {
          if (err1) {
            console.log(err1);
            resp.status(500).json({
              "status": 0,
              "message": "Something Went Wrong."
            });
          } else {
            resp.status(200).json({
              "status": 1,
              "message": "unit added successfully."
            });
          }
        })
      }
    }
  })
}

// Created by: Sushant
// Created on: 21/06/2019
// Updated on: 

exports.getUnit = function (req, resp) {
  connection.query("select * from unit_master_ut where status = 1", function (err, rows) {
    if (err) {
      console.log(err);
      resp.status(500).json({
        "status": 0,
        "message": "Something Went Wrong."
      });
    } else {
      if (rows.length > 0) {
        resp.status(200).json({
          "status": 1,
          "data": rows
        });
      } else {
        resp.status(204).json({
          "status": 0,
          "message": "No record found."
        });
      }
    }
  })
}


// Created by: Sushant
// Created on: 21/06/2019
// Updated on: 

exports.getUnitById = function (req, resp) {
  connection.query("select * from unit_master_ut where id = " + req.body.id + "", function (err, rows) {
    if (err) {
      console.log(err);
      resp.status(500).json({
        "status": 0,
        "message": "Something Went Wrong."
      });
    } else {
      if (rows.length > 0) {
        resp.status(200).json({
          "status": 1,
          "data": rows[0]
        });
      } else {
        resp.status(204).json({
          "status": 0,
          "message": "No record found."
        });
      }
    }
  })
}


// Created by: Sushant
// Created on: 21/06/2019
// Updated on: 

exports.editUnit = function (req, resp) {
  connection.query("select * from unit_master_ut where name = '" + req.body.name + "' and not (id = " + req.body.id + ") and status = 1", function (err, rows) {
    if (err) {
      console.log(err);
      resp.status(500).json({
        "status": 0,
        "message": "Something Went Wrong."
      });
    } else {
      if (rows.length > 0) {
        resp.status(200).json({
          "status": 0,
          "message": "Unit is already exist."
        });
      } else {
        connection.query("update unit_master_ut set name = '" + req.body.name + "', american_unit = '" + req.body.american_unit + "', metric_unit = '" + req.body.metric_unit + "', conversion_factor = '" + req.body.conversion_factor + "', modified_by = " + req.body.modified_by + ", modified_on = '" + Date.now() + "' where id = " + req.body.id + "", function (err1, rows1) {
          if (err1) {
            console.log(err1);
            resp.status(500).json({
              "status": 0,
              "message": "Something Went Wrong."
            });
          } else {
            resp.status(200).json({
              "status": 1,
              "message": "Unit updated successfully."
            });
          }
        })
      }
    }
  })
}

// Created by: Sushant
// Created on: 21/06/2019
// Updated on: 

exports.deleteUnit = function (req, resp) {
  connection.query("select * from unit_master_ut where id = " + req.body.id + "", function (err, rows) {
    if (err) {
      console.log(err);
      resp.status(500).json({
        "status": 0,
        "message": "Something Went Wrong."
      });
    } else {
      if (rows.length > 0) {
        connection.query("update unit_master_ut set status = 0 where id = " + req.body.id + "", function (err1, rows1) {
          if (err1) {
            console.log(err1);
            resp.status(500).json({
              "status": 0,
              "message": "Something Went Wrong."
            });
          } else {
            resp.status(200).json({
              "status": 1,
              "message": "Unit deleted successfully."
            });
          }
        })
      } else {
        resp.status(204).json({
          "status": 0,
          "message": "No record found."
        });
      }
    }
  })
}


function mysql_real_escape_string(str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\" + char; // prepends a backslash to backslash, percent,
                // and double/single quotes
        }
    });
}