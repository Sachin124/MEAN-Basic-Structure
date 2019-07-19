//for database connection
var mysql = require('mysql');

var enviroment_local = {
    Dbconnection: mysql.createConnection({
        database: 'frogmen',
        user: 'root',
        password: 'root',
        host: 'localhost',
        acquireTimeout: 1000000
    }),
    base_urls: __dirname + "/",
    mailURL: 'http://18.222.244.130:4000/admin/',
    mailURL1: 'http://18.222.244.130:4000/',
    timestamp: function() {
        var currnettimestamp = new Date();
        return currnettimestamp.getTime();
    },
    port: 4000
}

var enviroment_development = {
    Dbconnection: mysql.createConnection({
        database: 'frogmen',
        user: 'root',
        password: 'Etpl@321',
        host: 'localhost',
        acquireTimeout: 1000000
    }),
    base_urls: __dirname + "/",
    mailURL: 'http://18.222.244.130:4000/admin/',
    mailURL1: 'http://18.222.244.130:4000/',
    timestamp: function() {
        var currnettimestamp = new Date();
        return currnettimestamp.getTime();
    },
    port: 4000
}

  module.exports = enviroment_local;
//   module.exports = enviroment_development;
