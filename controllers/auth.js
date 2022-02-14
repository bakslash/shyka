const models = require("../models/index");
const config = require("../config/auth.config");
const returns = require('../returns/returns')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res, next) => {

  try {

    const user = await models.users.create({

      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email.toLowerCase(),
      phone: req.body.phone,
      status: 1,
      role_id: 2,
      password: bcrypt.hashSync(req.body.password, 8)
    })
    const accessToken = jwt.sign({
      id: user.id
    }, config.secret, {
      expiresIn: 86400 // 24 hours
    });

    // save user token
    user.token = accessToken;
    console.log(user);
    await returns.successfullReturns(req, res, user)

  } catch (err) {
    console.log(err);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const reguser = await models.users.findOne({
      where: {
        email: req.body.email
      }
    })
    if (!(req.body.email && req.body.password)) {
      res.status(400).send("All input is required");
    }

    if (!reguser) {
      return res.status(404).send({
        message: "User Not found."
      });
    }

    var passwordIsValid = await bcrypt.compare(req.body.password,
      reguser.password);
    
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }
    var accessToken = jwt.sign({
      id: reguser.id
    }, config.secret, {
      expiresIn: 86400 // 24 hours
    });
    data = {
      id: reguser.id,
      first_name: reguser.first_name,
      last_name: reguser.last_name,
      email: reguser.email,
      role_id: reguser.role_id,
      token: accessToken
    }
    await returns.successfullReturns(req, res, data)

  } catch (err) { console.log(err); }
};


//update password
//forgot password
//reset password