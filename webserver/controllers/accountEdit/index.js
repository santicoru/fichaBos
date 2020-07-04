'use strict';

const deleteAccountController = require('./delete-account');
const editAccountController = require('./edit-account');
const accountEditController = {
    deleteAccountController,
    editAccountController,
};

module.exports = accountEditController;