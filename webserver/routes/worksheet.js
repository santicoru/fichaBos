'use strict';

const express = require('express');
const router = express.Router();
const {
    createRegister,
    readEntries
} = require('../controllers/workSheet');
const {
    checkAccountSession,
} = require('../controllers/account/check-account-session');

router.post('/', checkAccountSession, createRegister);


module.exports = router;