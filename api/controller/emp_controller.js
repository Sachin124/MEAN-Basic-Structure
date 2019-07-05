const  Customer = require('../model/customer_model.js');
const express = require('express');

const customerRoute = express.Router();

customerRoute.route('/')
    .get((req, res) => {
        Customer.find({}, (err, books) => {
            res.json(books)
        })  
    })
    .post((req, res) => {
        let book = new Book(req.body);
        Customer.save();
        res.status(201).send(book) 
});

module.exports = customerRoute;