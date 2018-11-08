'use strict'

const express    = require('express'),
	router       = express.Router(),
    c_auth       = require('./c_auth');

router
	.get('/login', c_auth.login)
	.get('/validatorToken', global.ensureAuth, c_auth.validatorToken)

module.exports = router;
