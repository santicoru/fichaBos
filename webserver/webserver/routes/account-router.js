'use strict';

const express = require('express');
const router = express.Router();
const {
  createAccountController,
  checkAccountSession,
} = require('../controllers/account/index');

router.post('/', createAccountController);

module.exports = router;