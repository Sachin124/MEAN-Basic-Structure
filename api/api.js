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

// Get all posts
router.get('/posts', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  axios.get(`${API}/posts`)
    .then(posts => {
      // res.status(200).json(posts.data);

      MongoClient.connect('mongodb://localhost:27017/mean', (err, db) => {
        db.collection('angular').find().toArray().then((docs) => {
          if (err) {
            return console.log('Unable TO fetch data');
          }
          // console.log(JSON.stringify(docs, undefined, 2));
          res.status(200).json(docs);
        });
      });

    })
    .catch(error => {
      res.status(500).send(error)
    });
});



router.post('/saveAngular', (req, res) => {

  console.log(req.body.version);
  var a = {
    version: req.body.version
  };
  // res.status(200).json(a);
  // axios.get(`${API}/saveAngular`)
  //   .then(posts => {
      MongoClient.connect('mongodb://localhost:27017/mean', (err, db) => {
        db.collection('angular').insertOne(a).then((docs) => {
          if (err) {
            return console.log('Unable TO fetch data');
          }
          // console.log(JSON.stringify(docs, undefined, 2));
          res.status(200).json(a);
        });
      });

    // })
    // .catch(error => {
    //   res.status(500).send(error)
    // });

});


module.exports = router;