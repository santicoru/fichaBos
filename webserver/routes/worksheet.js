'use strict';

const express = require('express');
const router = express.Router();
const {
    createRegister,
    readEntries
} = require('../controllers/workSheet');
const {
    checkAccountSession,
} = require('../controllers/account/index');

router.post('/', checkAccountSession, createRegister);
router.get('/', checkAccountSession, readEntries);

module.exports = router;