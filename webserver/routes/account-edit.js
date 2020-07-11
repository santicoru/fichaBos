'use strict';

const express = require('express');
const router = express.Router();
// const {
//     editAccountController
// } = require('../controllers/accountEdit');
const {
    checkAccountSession,
} = require('../controllers/account/check-account-session');

router.put('/', checkAccountSession, editAccountController);

module.exports = router;