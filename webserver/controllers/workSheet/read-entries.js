'use strict';

const express = require ("express");
//const bodyParser = require("body-parser");

/*
OJO
Hacer un filtro para recuperar todo del histórico
*/

const app = express();

app.get ("/", function (req, res) {

    const { userId } = req.claims;
    console.log(userId);
    const accountData = { ...req.body };
    console.log(accountData);

});