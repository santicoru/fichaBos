'use strict';

const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const mysqlPool = require('../../../database/mysql-pool');

async function validateSchema(payload) {
  const schema = Joi.object({
    type: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{1,30}$/).required(),
  });
  Joi.assert(payload, schema);
}

async function login(req, res, next) {
  const authData = { ...req.body };
  console.log(authData);
  try {
    await validateSchema(authData);
  } catch (e) {
    return res.status(402).send(e);
  }

if(authData.type==="user"){
  try {
    const sqlQuery = `SELECT userId, userName, userEmail, userPassword
            FROM userBos
            WHERE userEmail='${authData.email}'`;
    const connection = await mysqlPool.getConnection();
    const [result] = await connection.query(sqlQuery);
    connection.release();

    console.log(result[0]);

    if (result.length !== 1) {
      return res.status(401).send();
    }

    const userData = result[0];
    const isPasswordOk = await bcrypt.compare(authData.password, userData.userPassword);

    if (!isPasswordOk) {
      return res.status(401).send();
    }

    const payloadJwt = {
      userId: userData.id,
      //role: admin,
    };

    const jwtExpiresIn = 6000000;
    const token = jwt.sign(payloadJwt, "Fichamelavida", {
      expiresIn: jwtExpiresIn,
    });

    const response = {
      accessToken : token,
      role: "user",
      expiresIn: jwtExpiresIn,
    };

    return res.status(200).send(response);

  } catch (e) {
    console.error(e);
    return res.status(500).send({
      message: e.message,
    });
  }
}else if(authData.type==="admin"){
  try {
    const sqlQuery = `SELECT userId, userName, userEmail, userPassword
            FROM administrator
            WHERE userEmail='${authData.email}'`;
    const connection = await mysqlPool.getConnection();
    const [result] = await connection.query(sqlQuery);
    connection.release();

    console.log(result[0]);

    if (result.length !== 1) {
      return res.status(401).send();
    }

    const userData = result[0];
    const isPasswordOk = await bcrypt.compare(authData.password, userData.userPassword);

    if (!isPasswordOk) {
      return res.status(401).send();
    }

    const payloadJwt = {
      userId: userData.id,
      //role: admin,
    };

    const jwtExpiresIn = 6000000;
    const token = jwt.sign(payloadJwt, "Fichamelavida", {
      expiresIn: jwtExpiresIn,
    });

    const response = {
      accessToken : token,
      role: "admin",
      expiresIn: jwtExpiresIn,
    };

    return res.status(200).send(response);

  } catch (e) {
    console.error(e);
    return res.status(500).send({
      message: e.message,
    });
  }

}
}

module.exports = login;