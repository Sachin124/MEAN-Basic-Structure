var env = require('../config/connection');
var connection = env.Dbconnection;
var md5 = require('md5');
var async = require('async');
var randtoken = require('rand-token');
const jwt = require('jsonwebtoken');
const sendmail = require("./sendmail");


// Created by: Sushant
// Created on: 31/05/2019
// Updated on:

exports.login = function (req, resp) {
  connection.query("select id, user_login, status, user_role_id from user_master_ut where user_login = '" + req.body.email + "' and password = '" + md5(req.body.password) + "' and user_role_id = " + req.body.role_id + "", function (err, rows) {
    if (err) {
      console.log(err);
      resp.status(200).json({
        "status": 0,
        "message": "Something went wrong"
      });
    } else {
      if (rows.length > 0) {
        if (rows[0].status == 1) {
          if (rows[0].user_role_id == 1) {
            const token = jwt.sign({
              userID: rows[0].id
            }, 'todo-app-super-shared-secret', {
              expiresIn: '12h'
            });
            resp.status(200).json({
              "status": 1,
              "data": rows[0],
              "token": token,
              "message": "Login Successful"
            })
          } else {
            connection.query("select * from client_master_ut where user_id = " + rows[0].id + "", function (err, rows1) {
              if (err) {
                console.log(err);
                resp.status(200).json({
                  "status": 0,
                  "message": "Something went wrong"
                });
              } else {
                if (rows1.length > 0) {
                  const token = jwt.sign({
                    userID: rows[0].id
                  }, 'todo-app-super-shared-secret', {
                    expiresIn: '12h'
                  });
                  resp.status(200).json({
                    "status": 1,
                    "data": rows1[0],
                    "token": token,
                    "message": "Login Successful"
                  })
                } else {
                  connection.query("select * from co_owner_master_ut where user_id = " + rows[0].id + "", function (err, rows1) {
                    if (err) {
                      console.log(err);
                      resp.status(200).json({
                        "status": 0,
                        "message": "Something went wrong"
                      });
                    } else {
                      if (rows1.length > 0) {
                        const token = jwt.sign({
                          userID: rows[0].id
                        }, 'todo-app-super-shared-secret', {
                          expiresIn: '12h'
                        });
                        resp.status(200).json({
                          "status": 1,
                          "data": rows1[0],
                          "token": token,
                          "message": "Login Successful"
                        })
                      } else {
                        resp.status(200).json({
                          "status": 0,
                          "message": "No data available"
                        });
                      }
                    }
                  })
                }
              }
            })
          }
        } else {
          resp.status(200).json({
            "status": 0,
            "message": "Account is not activated"
          });
        }
      } else {
        resp.status(200).json({
          "status": 0,
          "message": "Incorrect Email or Password"
        });
      }
    }
  })
}

// Created by: Sushant
// Created on: 01/06/2019
// Updated on:

exports.forgotPassword = function (req, resp) {
  connection.query("select * from user_master_ut where user_login = '" + req.body.email + "'", function (err, rows) {
      if (err) {
          console.log(err);
          resp.status(200).json({
              "status": 0,
              "message": "Something went wrong"
          });
      } else {
          if (rows.length > 0) {
              if (rows[0].status == 1) {
                  let token = randtoken.generate(11);
                  let mailto = req.body.email;
                  let subject = "Frogmen Reset Password."
                  let link;
                  if (req.body.role_id == 1) {
                      link = env.mailURL + "changepassword/" + token;
                  } else {
                      link = env.mailURL1 + "changepassword/" + token;
                  }
                  let mailmattter = link;
                  connection.query("select * from authentication where user_id = " + rows[0].id, function (err, tokenrows) {
                      if (err) {
                          resp.status(200).json({
                              "status": 0,
                              "message": "Something Went Wrong"
                          });
                      } else {
                          if (tokenrows.length > 0) {
                              connection.query("UPDATE authentication SET token= '" + token + "' WHERE user_id=" + rows[0].id + "", function (err, rows1) {
                                  if (err) {
                                      resp.status(200).json({
                                          "status": 0,
                                          "message": "Something Went Wrong"
                                      });
                                  } else {
                                      sendmail.sendmail(mailto, mailmattter, subject);
                                      resp.status(200).json({
                                          "status": 1,
                                          "message": "Reset password link has been sent to your Email."
                                      });
                                  }
                              });
                          } else {
                              connection.query("insert into authentication (token , user_id ) VALUES ('" + token + "', " + rows[0].id + ")", function (err, rows1) {
                                  if (err) {
                                      resp.status(200).json({
                                          "status": 0,
                                          "message": "Something Went Wrong"
                                      });
                                  } else {
                                      sendmail.sendmail(mailto, mailmattter, subject);
                                      resp.status(200).json({
                                          "status": 1,
                                          "message": "Reset password link has been sent to your Email."
                                      });
                                  }
                              });
                          }
                      }
                  });
              } else {
                  resp.status(200).json({
                      "status": 0,
                      "message": "Account is not activated"
                  });
              }
          } else {
              resp.status(200).json({
                  "status": 0,
                  "message": "Email is not registerd with us"
              });
          }
      }
  })
}

// Created by: Sushant
// Created on: 01/06/2019
// Updated on:

exports.checkToken = function (req, resp) {
  connection.query("select * from authentication where token = '" + req.body.token + "'", function (err, rows) {
      if (err) {
          console.log(err);
          resp.status(200).json({
              "status": 0,
              "message": "Something Went Wrong."
          });
      } else {
          if (rows.length > 0) {
              resp.status(200).json({
                  "status": 1
              });
          } else {
              resp.status(200).json({
                  "status": 0,
                  "message": "Link is expired"
              });
          }
      }
  });
}

// Created by: Sushant
// Created on: 01/06/2019
// Updated on:

exports.changePassword = function (req, resp) {
  connection.query("update user_master_ut set password = '" + md5(req.body.password) + "' where id = (select user_id from authentication where token = '" + req.body.token + "')", function (err, rows) {
      if (err) {
          console.log(err);
          resp.status(200).json({
              "status": 0,
              "message": "Something Went Wrong."
          });
      } else {
          connection.query("delete from authentication where token = '" + req.body.token + "'", function (err, row) {
              if (err) {
                  resp.status(200).json({
                      "status": 0,
                      "message": "Something Went Wrong."
                  });
              } else {
                  resp.status(200).json({
                      "status": 1,
                      "message": "Your Password has been successfully updated."
                  });
              }
          });

      }
  });
}
