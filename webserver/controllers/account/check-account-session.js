'use strict';

const jwt = require('jsonwebtoken');

async function checkAccountSession(req, res, next) {
  
  console.log(req.headers.bearer)
  if (!req.headers.bearer) {
    return res.status(401).send();
  }

  try {
    const { userId } = jwt.verify(req.headers.bearer, "Fichamelavida");
    req.claims = {
      userId,
    };

    return next();

  } catch (e) {
    console.error(e);
    return res.status(401).send();
  }
}

module.exports = checkAccountSession;