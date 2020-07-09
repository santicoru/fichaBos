'use strict';

const router = require('express').Router();
const login = require('../controllers/login/login');

/*
OJO
Otro login para admin
Otro crear registro para admin
*/

router.post('/', login);

module.exports = router;