'use strict';

require('dotenv').config();
const webServer = require('./webserver');
const mysqlPool = require('./database/mysql-pool');

const httpListeningPort = process.env.PORT || 8080;

async function initApp() {
  try {
    await mysqlPool.connect();
    await webServer.listen(httpListeningPort);
    console.log(`server running at ${httpListeningPort}`);
  } catch (e) {
    console.error(e);
    process.exit(-1);
  }
}

initApp()