'use strict';

const router = require('express').Router();
const adminCreateAccount = require('../controllers/admin/admin-create-account');

const {
    adminCreateAccount,
    readEntries
} = require('../controllers/workSheet');
const {
    checkAccountSession,
} = require('../controllers/account/index');

router.post('/', adminCreateAccount);
router.get('/', checkAccountSession, readEntries);

module.exports = router;