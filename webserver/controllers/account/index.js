'use strict';

const createAccountController = require('./create-account-controller');
const checkAccountSession = require('./check-account-session');
const accountController = {
  createAccountController,
  checkAccountSession,
};

module.exports = accountController;