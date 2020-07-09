'use strict';

const express = require('express');
const router = express.Router();
const {
    deleteAccountController,
    editAccountController
} = require('../controllers/accountEdit');
const {
    checkAccountSession,
} = require('../controllers/account/index');

router.delete('/', checkAccountSession, deleteAccountController);
router.put('/', checkAccountSession, editAccountController);

module.exports = router;