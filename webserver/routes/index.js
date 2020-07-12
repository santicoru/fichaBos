'use strict';

const account = require('./account-router');
const admin = require('./admin');
const login = require('./login');
const worksheet = require('./worksheet');

module.exports = {
  account,
  admin,
  login,
  worksheet,
};
