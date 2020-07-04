'use strict';

require('dotenv').config();
const webServer = require('./webserver');
const mysqlPool = require('./database/mysql-pool');

const httpListenigPort = process.env.PORT;

async function initApp() {
  try {
    await mysqlPool.connect();
    await webServer.listen(httpListenigPort);
    console.log(`server running at ${httpListenigPort}`);
  } catch (e) {
    console.error(e);
    process.exit(-1);
  }
}

initApp()