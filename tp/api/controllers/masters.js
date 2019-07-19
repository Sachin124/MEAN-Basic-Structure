var env = require('../config/connection');
var connection = env.Dbconnection;
var md5 = require('md5');
var async = require('async');
var randtoken = require('rand-token');
const jwt = require('jsonwebtoken');
const sendmail = require("./sendmail");


// Created by: Sushant
// Created on: 04/06/2019
// Updated on: 

exports.addConsumable = function (req, resp) {
  connection.query("select * from consumable_master_ut where name = '" + req.body.name + "' and status = 1", function (err, rows) {
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
          "message": "Consumable is already exist."
        });
      } else {
        connection.query("insert into consumable_master_ut (name, unit_id, status, created_by, created_on) values ('" + req.body.name + "', " + req.body.unit_id + ", " + req.body.status + ", " + req.body.created_by + ", '" + Date.now() + "')", function (err1, rows1) {
          if (err1) {
            console.log(err1);
            resp.status(500).json({
              "status": 0,
              "message": "Something Went Wrong."
            });
          } else {
            resp.status(200).json({
              "status": 1,
              "message": "Consumable added successfully."
            });
          }
        })
      }
    }
  })
}

// Created by: Sushant
// Created on: 04/06/2019
// Updated on: 

exports.getConsumable = function (req, resp) {
  connection.query("select *, consumable_master_ut.id as id, consumable_master_ut.name as name, unit_master_ut.name as unit_name from consumable_master_ut join unit_master_ut on consumable_master_ut.unit_id = unit_master_ut.id where consumable_master_ut.status = 1", function (err, rows) {
    if (err) {
      console.log(err);
      resp.status(500).json({
        "status": 0,
        "message": "Something Went Wrong."
      });
    } else {
      console.log(rows);
      
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
// Created on: 04/06/2019
// Updated on: 

exports.getConsumableById = function (req, resp) {
  connection.query("select * from consumable_master_ut where id = " + req.body.id + "", function (err, rows) {
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
// Created on: 04/06/2019
// Updated on: 

exports.editConsumable = function (req, resp) {
  connection.query("select * from consumable_master_ut where name = '" + req.body.name + "' and not (id = " + req.body.id + ") and status = 1", function (err, rows) {
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
          "message": "Consumable is already exist."
        });
      } else {
        connection.query("update consumable_master_ut set name = '" + req.body.name + "', unit_id = " + req.body.unit_id + ", modified_by = " + req.body.modified_by + ", modified_on = '" + Date.now() + "' where id = " + req.body.id + "", function (err1, rows1) {
          if (err1) {
            console.log(err1);
            resp.status(500).json({
              "status": 0,
              "message": "Something Went Wrong."
            });
          } else {
            resp.status(200).json({
              "status": 1,
              "message": "Consumable updated successfully."
            });
          }
        })
      }
    }
  })
}

// Created by: Sushant
// Created on: 04/06/2019
// Updated on: 

exports.deleteConsumable = function (req, resp) {
  connection.query("select * from consumable_master_ut where id = " + req.body.id + "", function (err, rows) {
    if (err) {
      console.log(err);
      resp.status(500).json({
        "status": 0,
        "message": "Something Went Wrong."
      });
    } else {
      if (rows.length > 0) {
        connection.query("update consumable_master_ut set status = 0 where id = " + req.body.id + "", function (err1, rows1) {
          if (err1) {
            console.log(err1);
            resp.status(500).json({
              "status": 0,
              "message": "Something Went Wrong."
            });
          } else {
            resp.status(200).json({
              "status": 1,
              "message": "Consumable deleted successfully."
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