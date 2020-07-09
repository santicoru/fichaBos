'use strict';

const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const mysqlPool = require('../../../database/mysql-pool');
//const bodyParser = require("body-parser");

async function validateSchema(payload) {
  const schema = Joi.object({
    oldPassword: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/).required(),
    newPassword: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/).required(),
    repeatPassword: Joi.ref('newPassword'),
  });
  Joi.assert(payload, schema);
}

async function editAccount(req, res, next) {
  const { userId } = req.claims;
  console.log(userId);
  const accountData = { ...req.body };
  console.log(accountData);

  try {
    await validateSchema(accountData);
  } catch (e) {
    return res.status(400).send(e);
  }

  const securePassword = await bcrypt.hash(accountData.newPassword, 10);
  console.log(securePassword);
  try {
    const connection = await mysqlPool.getConnection();
    const sqlConsultPassword = `SELECT userPassword FROM userBos WHERE userId=${userId}`;
    const sqlInsert = `UPDATE userBos SET ? WHERE userId=${userId}`;
    const [pass] = await connection.query(sqlConsultPassword);
    const isPasswordOk = await bcrypt.compare(accountData.oldPassword, pass[0].password);

    if (!isPasswordOk) {
      return res.status(401).send('Contraseña no valida');
    } else {
      await connection.query(sqlInsert, {
        password: securePassword,
      });
      return res.status(201).send('Contraseña modificada');
    }
    connection.release();
  } catch (e) {
    console.error(e);
    return res.status(500).send({
      message: e.message,
    });
  }

}

module.exports = editAccount;