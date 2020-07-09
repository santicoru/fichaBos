'use strict';

const express = require ("express");
//const bodyParser = require("body-parser");

const app = express();

app.post ("/", function (req, res) {

    const newRegister = 

});



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