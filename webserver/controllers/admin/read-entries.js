"use strict";

//const { readEntries } = require("../workSheet");

const mysqlPool = require('../../../database/mysql-pool');

async function readEntries(req, res, next) {
  try {
    const workSheetState = req.body.worksheetState;
    const connection = await mysqlPool.getConnection();
    let sqlShow = null;
    // workSheetState = workSheetState || 1
    switch (workSheetState) {
      case 1:
        sqlShow =
          "SELECT * FROM worksheet WHERE worksheetState = 1 ORDER BY workDate";
        break;

      case 2:
        sqlShow =
          "SELECT * FROM worksheet WHERE worksheetState = 2 ORDER BY workDate";
        break;

      default:
        sqlShow = "SELECT * FROM worksheet ORDER BY workDate";
        break;
    }

    const [allData] = await connection.query(sqlShow);
    connection.release();

    return res.status(200).send(allData);
  } catch (e) {
    console.error(e);
    return res.status(500).send(e.message);
  }

  /*
    try {
        const connection = await mysqlPool.getConnection();
        const sqlShow = 'SELECT * FROM workSheetHistorical ORDER BY workDate';
    
        const [productsData] = await connection.query(sqlShow);
        connection.release();
    
        return res.status(200).send(productsData);
      } catch (e) {
        console.error(e);
        return res.status(500).send(e.message);
      }
      */
}

module.exports = readEntries;
