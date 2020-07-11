'use strict';

// const router = require('express').Router();
const express = require('express');
const login = require('../controllers/login/login');

/*
OJO
Otro login para admin
Otro crear registro para admin
*/

const router = express.Router();
router.post('/', login);

module.exports = router;