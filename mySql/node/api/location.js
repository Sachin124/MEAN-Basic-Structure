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
var insertId;
var selectWhereQuery = 'SELECT * FROM ?? WHERE ?? = ?';

var insertIntoQUery1 = `INSERT INTO ??
 (
     user_id, 
     first_name,
     last_name,
     email_id,
     federal_id_no,
     mobile_no,
     dob,
     designation,
     address,
     street1,
     street2,
     city_id,
     state_id,
     country_id,
     zipcode,
     emergency_contact_name,
     resume_file_path,
     emergency_contact_no,
     blood_group_id,
     transfusion_reaction,
     allergies_to_medication,
     present_medication,
     surgeries,
     dive_physcial,
     contact_lenses_flag,
     diabetic,
     eplleptic,
     dentures,
     status,
     created_by,
     created_on,
     modified_by,
     modified_on,
     upload_logo_file_path
) VALUES (
    ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
) `


var insertIntoQUery2 = `INSERT INTO ??
 (
    personnel_id,
    qualification_id,
    cert_start_date,
    cert_exp_date,
    attachment_file_path,
    notes,
    created_by,
    created_on,
    modified_by,
    modified_on,
    status
) VALUES (
    ?,?,?,?,?,?,?,?,?,?,?
) `
var handle_database = ((req, res, isAnother) => {
    // Connection will be acquired automatically

    pool.query(req, (err, rows) => {
        if (err) {
            return res.json({
                'error': true,
                'message': `Error occurred${err}`
            });
        } else {
            // Connection will be released as well.
            insertId = rows.insertId;

            if (isAnother) {
                if (insertId) {       
                    addAnother(isAnother, res);
                }
            }else{
                res.status(200).json(rows);
            }
        }
    })
});


router.get("/getCountry", function (req, res) {
    let sqlQuery = "SELECT * FROM countries";
    handle_database(sqlQuery, res, null);
});

router.get("/getCountrys",(req,res)=>{
    let sqlQuery = "SELECT * FROM countries";
    handle_database(sqlQuery, res, null);
})


router.get("/getStates/:id", function (req, res) {
    let sqlQuery = mysql.format(selectWhereQuery, ["states", "country_id", req.params.id]);
    handle_database(sqlQuery, res, null);
});


router.get("/getCities/:id", function (req, res) {
    let sqlQuery = mysql.format(selectWhereQuery, ["cities", "state_id", req.params.id]);
    handle_database(sqlQuery, res, null);
});


router.post("/adddata", function (req, res) {
    let sqlQuery = mysql.format(insertIntoQUery1,
       [ "personnel_master_ut", req.body.user_id, 
        req.body.first_name,
        req.body.last_name,
        req.body.email_id,
        req.body.federal_id_no,
        req.body.mobile_no,
        req.body.dob,
        req.body.designation,
        req.body.address,
        req.body.street1,
        req.body.street2,
        req.body.city_id,
        req.body.state_id,
        req.body.country_id,
        req.body.zipcode,
        req.body.emergency_contact_name,
        req.body.resume_file_path,
        req.body.emergency_contact_no,
        req.body.blood_group_id,
        req.body.transfusion_reaction,
        req.body.allergies_to_medication,
        req.body.present_medication,
        req.body.surgeries,
        req.body.dive_physcial,
        req.body.contact_lenses_flag,
        req.body.diabetic,
        req.body.eplleptic,
        req.body.dentures,
        req.body.status,
        req.body.created_by,
        req.body.created_on,
        req.body.modified_by,
        req.body.modified_on,
        req.body.upload_logo_file_path,
    ]);
    handle_database(sqlQuery, res, req.body.qualification);
    
   
});

addAnother = (rowsData, res)=>{
    let sqlQuery = mysql.format(insertIntoQUery2,
        [ "personnel_qualification_ut",
        insertId,
        rowsData.qualification_id,
        rowsData.cert_start_date,
        rowsData.cert_exp_date,
        rowsData.attachment_file_path,
        rowsData.notes,
        rowsData.created_by,
        rowsData.created_on,
        rowsData.modified_by,
        rowsData.modified_on,
        rowsData.status
    ]);    
    handle_database(sqlQuery, res, null);
}


module.exports = router;