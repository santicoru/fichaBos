"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('routes');


const app = express();
app.use(bodyParser.json());
app.use(express.json());

// app.use(cors());
app.use(function(req, res, next) {
      res.header('Access-Control.Allow.Origin', '*');
      res.header('Access-Control.Allow.Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control.Allow.Headers', 'Cotent-Type');
    }
)
/*
app.use("/api/account", routes.account);
app.use('/api/acModif', routes.accountModif);
app.use("/api/auth", routes.auth);
app.use("/api/product", routes.product);
app.use("/api/catalogue", routes.catalogue);
app.use('/api/ordersHistory', routes.ordersHistory);
app.use('/api/orderFinal', routes.orderFinal);
app.use('/api/rateProduct', routes.rateProduct);
app.use('/api/filter/catalogue', routes.filterCatalogue);
app.use('/api/packageP', routes.packageP);
*/

app.get("/", (req, res, next) => {
  res.send("base url: /api");
});

let server = null;

async function listen(port) {
  if (server === null) {
    server = await app.listen(port);
  } else {
    console.error("Can not listen, server already initialized");
  }
}

async function close() {
  if (server) {
    await server.close();
    server = null;
  } else {
    console.error("Can not close a non started server");
  }

  
}



module.exports = {
  listen,
  close
};