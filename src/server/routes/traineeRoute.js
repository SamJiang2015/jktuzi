// 
// traineeRoute.js
// 


var express = require('express');
var router = express.Router();

var _ = require('underscore');
var db = require('../db.js');
var middleware = require('../middleware.js')(db);
var util = require('../util.js');

