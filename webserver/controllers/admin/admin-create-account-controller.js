'use strict';

const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
//const bodyParser = require("body-parser");
const sendgridMail = require('@sendgrid/mail');
const mysqlPool = require('../../../database/mysql-pool');

const httpServerDomain = process.env.HTTP_SERVER_DOMAIN;

sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

async function validateSchema(payload) {
  const schema = Joi.object({
    name: Joi.string(),
    surname: Joi.string().allow(null),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{1,30}$/).required(),
  });
  Joi.assert(payload, schema);
}


async function adminCreateAccount(req, res, next) {
  const accountData = { ...req.body };
  /*
  *sustituir por el del usuario en producción:
  */
  const userEmail = 'usuarioDePrueba@gmail.com';

  try {
    await validateSchema(accountData);
  } catch (e) {
    console.log(e);
    return res.status(400).send(e);
  }

  const now = new Date();
  const createdAt = now.toISOString().substring(0, 19).replace('T', ' ');
  const securePassword = await bcrypt.hash(accountData.password, 10);

  try {
    const connection = await mysqlPool.getConnection();
    const sqlInsercion = 'INSERT INTO administrator SET ?';
    await connection.query(sqlInsercion, {
      userName: accountData.name,
      userEmail: accountData.email,
      userPassword: securePassword,
      registerDate: createdAt,
    });
    connection.release();
    return res.status(200).send();
    
  } catch (e) {
    console.error(e);
    return res.status(500).send(e.message);
  }

}


module.exports = adminCreateAccount;