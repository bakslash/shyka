const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const models = require("../models");
const returns = require('../returns/returns')


exports.verifyToken = (req, res, next) => {
  try {
    let token = req.body.token || req.query.token || req.headers["Authorization"];
    console.log('testing token', token);
    if (!token) {
      return res.status(403).send({
        message: "A token is required for authentication"
      });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Invalid Token"
        });
      }
      req.userId = decoded.id;
      next();
    });

  } catch (err) {
    console.log(err);
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const regrole = await models.users.findByPk(
      req.userId)
    if (regrole.role_id !== 1) {
      res.status(403).send({
        message: "Require Admin Role!"
      });
    }
    if (regrole.role_id === 1) {
      next();
      returns.successfullReturns(req, res, regrole)
    }

  } catch (err) {
    console.log(err);
  }

};


