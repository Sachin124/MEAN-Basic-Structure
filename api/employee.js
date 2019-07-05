const express = require('express');
const router = express.Router();

const {
  mongoose
} = require('../db/mongoose');
// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';
var cors = require('cors')

var app = express()
app.use(cors())
/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

const {
  MongoClient
} = require('mongodb');

// router.get('/createColletion', (req, res) => {

// MongoClient.connect('mongodb://localhost:27017/mean', function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("mydb");
//     dbo.createCollection("employees", function(err, res) {
//       if (err) throw err;
//       console.log("Collection created!");
//       res.status(200).json(res);
//       db.close();
//     });
//   });
// });


// Get all posts
router.get('/getEmployee', (req, res) => {  
        MongoClient.connect('mongodb://localhost:27017/mean', (err, db) => {
          db.collection('employees').find().toArray().then((docs) => {
            if (err) {
              return console.log('Unable TO fetch data');
            }
            res.status(200).json(docs);
          });
        });  
      })
      
//   });


router.post('/addemployee', (req, res) => {
    console.log(req.body);
    var employeeData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      Designation: req.body.Designation,
      Skills: req.body.Skills,
      salary: req.body.salary  
    };
        MongoClient.connect('mongodb://localhost:27017/mean', (err, db) => {
          db.collection('employees').insertOne(employeeData).then((docs) => {
            if (err) {
              return console.log('Unable TO fetch data');
            }
            res.status(200).json(employeeData);
          });
        });
  });


module.exports = router;

