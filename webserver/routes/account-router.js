'use strict';

const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account/index');

router.post('/', accountController.createAccountController);

module.exports = router;