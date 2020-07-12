'use strict';

const bcrypt = require('bcrypt');
const cryptoRandomString = require('crypto-random-string');
const Joi = require('@hapi/joi');
//const uuidV4 = require('uuid/v4');
const sendgridMail = require('@sendgrid/mail');
const mysqlPool = require('../../../database/mysql-pool');

const httpServerDomain = process.env.HTTP_SERVER_DOMAIN;

sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

async function validateSchema(payload) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{1,30}$/).required(),
  });

  Joi.assert(payload, schema);
}

async function sendEmailRegistration(userEmail, verificationCode) {
  const linkActivacion = `${httpServerDomain}/api/account/activation?verification_code=${verificationCode}`;
  const msg = {
    to: userEmail,
    from: {
      email: 'notesapp@yopmail.com',
      name: 'Notes App :)',
    },
    subject: 'Registrado satisfactoriamente',
    text: 'Bienvenido a FichameLavIda',
    html: `To confirm the account <a href="${linkActivacion}">activate it here</a>`,
  };

  const data = await sendgridMail.send(msg);

  return data;
}



async function createAccount(req, res, next) {
  /*
  const {
    email,
    password,
  } = req.body;
  */
  const accountData = { ...req.body };

  /**
   * Validar datos entrada y si no son correctos,
   * devolver http status 400 Bad Request + explicación
   */
  try {
    await validateSchema(accountData);
  } catch (e) {
    return res.status(400).send(e);
  }

  /**
   * Tenemos que insertar el usuario en la bbdd, para ello:
   * 1. Generamos un uuid v4
   * 2. Miramos la fecha actual created_at
   * 3. Calculamos hash de la password que nos mandan para almacenarla
   * de forma segura en la base de datos usando bcrypt
   */
  const now = new Date();
  const createdAt = now.toISOString().substring(0, 19).replace('T', ' ');
  //const userId = uuidV4();
  const securePassword = await bcrypt.hash(accountData.password, 10);

  try {
    const connection = await mysqlPool.getConnection();
    const sqlInsercion = 'INSERT INTO userBos SET ?';
    await connection.query(sqlInsercion, {
      id: accountData.userId,
      name: accountData.userName,
      surname: accountData.userSurname,
      email: accountData.email,
      password: securePassword,
      created_at: createdAt,
    });
    connection.release();

    const verificationCode = await addVerificationCode(userId);

    await sendEmailRegistration(accountData.email, verificationCode);

    res.status(201).send('Account created');
  } catch (e) {
    console.error(e);
    return res.status(500).send(e.message);
  }
}

module.exports = createAccount;



/*
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

async function sendEmailRegistration(userEmail) {

  const msg = {
    to: userEmail,
    from: {
      email: 'usuarioDePrueba@hotmail.com',
      name: 'Yoyo',
    },
    subject: 'Cuenta creada',
    text: 'Sic semper tyrannis',
  };
  const data = await sendgridMail.send(msg);
  return data;
}
*/

// async function createAccount(req, res, next) {
//   const accountData = { ...req.body };
//   /*
//   *sustituir por el del usuario en producción:
//   */
//   const userEmail = 'usuarioDePrueba@gmail.com';

//   try {
//     await validateSchema(accountData);
//   } catch (e) {
//     console.log(e);
//     return res.status(400).send(e);
//   }

//   try {
//     await sendEmailRegistration(userEmail);
//   } catch (e) {
//     return res.status(400).send(e);
//   }

//   const now = new Date();
//   const createdAt = now.toISOString().substring(0, 19).replace('T', ' ');
//   const securePassword = await bcrypt.hash(accountData.password, 10);

//   try {
//     const connection = await mysqlPool.getConnection();
//     const sqlInsercion = 'INSERT INTO userBos SET ?';

//     await connection.query(sqlInsercion, {
//       id: accountData.userId,
//       name: accountData.userName,
//       document_number: accountData.document_number,
//       email: accountData.email,
//       password: securePassword,
//       created_at: createdAt,
//       /*
//       phone: accountData.phone,
//       birth_date: accountData.birth_date,
//       document_type: accountData.document_type,
//       */
//     });

//     // Comprobar que es userEmail y no email a secas
//     const [id] = await connection.query(`SELECT userId FROM userBos WHERE userEmail='${accountData.email}'`);
//     const userId = id[0].id;

//     connection.release();

//     const payloadJwt = {
//       userId: userId,
//       //role: accountData.user_type,
//     };

//     const jwtExpiresIn = parseInt(process.env.AUTH_ACCESS_TOKEN_TTL);
//     const token = jwt.sign(payloadJwt, process.env.AUTH_JWT_SECRET, {
//       expiresIn: jwtExpiresIn,
//     });

//     const response = {
//       token,
//       expiresIn: jwtExpiresIn,
//     };

//     await sendEmailRegistration(userEmail)
//     // await sendEmailRegistration(accountData.email, verificationCode);
//     return res.status(200).send(response);

//   } catch (e) {
//     console.error(e);
//     return res.status(500).send('Unable to register');
//   }

// }


// module.exports = createAccount;
