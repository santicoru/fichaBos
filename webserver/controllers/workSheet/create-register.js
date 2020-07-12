'use strict';

const Joi = require('@hapi/joi');
//const uuidV4 = require('uuid/v4');
const mysqlPool = require('../../../database/mysql-pool');

const httpServerDomain = process.env.HTTP_SERVER_DOMAIN;

async function validateSchema(payload) {
  const schema = Joi.object({
    workSheetId: Joi.string(),
    project: Joi.string(),
    userId: Joi.string(),
    // .guid({
    //   version: ['uuidv4'],
    // }).required(),
    workDate: Joi.string(),
    timeIn: Joi.string(),
    timeOut: Joi.string(),
    WorksheetState: Joi.string(),
  });

  Joi.assert(payload, schema);
}


async function createRegister(req, res, next) {
  const { userId } = req.claims;
  const noteData = {
    ...req.body,
    userId,
  };

  try {
    await validateSchema(noteData);

 
    //const noteId = uuidV4();
    const now = new Date().toISOString().substring(0, 19).replace('T', ' ');
    const sqlCreateNote = 'INSERT INTO workSheet SET ?';

    const connection = await mysqlPool.getConnection();
    const [result] = await connection.query(sqlCreateNote, {
      //
      //workSheetId: noteId,
      workSheetId: noteData.workSheetId,
      project: noteData.project,
      userId: noteData.userId,
      workDate: now,
      timeIn: noteData.timeIn,
      timeOut: noteData.timeOut,
      WorksheetState: noteData.WorksheetState,
    });

    connection.release();

    res.setHeader('Location', `${httpServerDomain}/api/notes/${noteId}`);
    return res.status(201).send();
  } catch (e) {
    console.error(e);
    return res.status(400).send(e);
  }
}

module.exports = createRegister;




/*
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
      const sqlInsert = `UPDATE worksheet SET ? WHERE userId=${userId}`;
  
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
  */