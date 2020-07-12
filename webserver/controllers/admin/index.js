'use strict';

const adminCreateAccountController = require('./create-account-controller');
const checkAccountSession = require('./check-account-session');
const readEntries = require('./read-entries');
const adminController = {
  adminCreateAccountController,
  checkAccountSession,
  readEntries
};

module.exports = adminController;