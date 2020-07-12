'use strict';

const router = require('express').Router();
const adminCreateAccount = require('../controllers/admin/admin-create-account-controller');
const readEntries = require('../controllers/admin/read-entries')

const accountController = require('../controllers/account/index');



router.post('/', adminCreateAccount);

router.get('/',  readEntries);

module.exports = router;