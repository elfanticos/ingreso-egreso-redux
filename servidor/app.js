'use strict'
const express    = require('express'),
	  bodyParser = require('body-parser'),
	  cors       = require('cors'),
	  app        = express();


//ROUTES
var r_auth    = require("./modulos/auth/r_auth");

app
	//parse application/json
	.use(bodyParser.json())
	//parse application/x-www-form-urlencoded
	.use(bodyParser.urlencoded({extended : false}))
	//Cabecera http
	.use(cors())
	.use('/auth',r_auth)


module.exports = app;
