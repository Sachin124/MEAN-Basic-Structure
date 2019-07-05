
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/mean');

module.exports = {mongoose};

/*
 In this program mongoose is a library for connecting the database 
so we import that after we want to connect that database if database not exist then mongoose 
or mongodb will create for us, in our case the database in postapi
 */