'use strict';

const mysql = require('mysql2/promise');

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = process.env;

let pool = null;

async function connect() {
  const options = {
    connectionLimit: 10,
    host: MYSQL_HOST,
    user: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    port: MYSQL_PORT,
    timezone: 'Z',
    multipleStatements: true,
  };

  pool = mysql.createPool(options);

  try {
    const connection = await pool.getConnection();
    if (connection) {
      connection.release();
    }
  } catch (e) {
    console.error('mysql pool connect', e);
    throw e;
  }
}

async function getConnection() {
  if (pool === null) {
    throw new Error("Connection fail. Unable to connect with mysql.");
  }

  const connection = await pool.getConnection();

  return connection;
}

module.exports = {
  connect,
  getConnection,
};