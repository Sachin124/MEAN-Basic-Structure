var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/mean');

var customerSchema = new Schema({
    name : { type : String ,  required : true} ,
    address: String,
    phone: String,
    email: String
} , { strict : false } );
 
module.exports = mongoose.model('Customer', customerSchema);