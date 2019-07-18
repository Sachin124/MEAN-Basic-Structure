const express  = require('express');
const router =  express.Router();
const cors = require('cors');
const app = express();
const pool = require('../../db/config');
app.use(cors());
