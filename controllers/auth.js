const models = require("../models/index");
const config = require("../config/auth.config");
const returns = require('../returns/returns')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const emailController = require('./email')
const smsController = require('./sms')
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

    const sendEmail = await emailController.sendEmailToken(user.email, user.token);
    const sendSms = await smsController.sendSmsCode(user.phone);


    await returns.successfullReturns(req, res, user)

  } catch (err) {
    console.log(err);
  }

};

//function for forgot password
exports.resetPassword = async (req, res, next) => {
  try {
    console.log(req.body.email)
    //check if the email is valid
    //get the email from the db
    const verifyUser = await models.users.findOne({
      where: {
        email: req.body.email
      }
    });
    if (!verifyUser) {
      const message = "email not registered";
      await returns.validationErrors(req, res, message);
    }

    const passToken = jwt.sign({ id: verifyUser.id },
      config.secret, { expiresIn: 86400 })

    const newToken = await models.users.update({
      token: passToken // 24 hours expiry
    },

      { where: { id: verifyUser.id } }
    )

    const sendEmail = await emailController.sendEmailToken(verifyUser.email, verifyUser.token);
console.log('verification email and token',verifyUser.email, verifyUser.token);

    data = {
      message: "check email to reset password"
    }
    await returns.successfullReturns(req, res, user)
  } catch (err) {
    console.log(err)

  }
}

//endpoint to update password
exports.updatePassword = async (req, res, next) => {
  try {
    console.log("Email verification")
    //get the token from the db
    const verifyEmailToken = await models.users.findOne({
      where: {
        token: req.params.token
      }
    });
    if (!verifyEmailToken) {
      const message = "Token expired";
      await returns.validationErrors(req, res, message);

    }
    if (verifyEmailToken) {
      const newPassword = await models.users.update({ 
        password: bcrypt.hashSync(req.body.password, 8)
    })
    await returns.successfullReturns(req, res, user)
    }
  } catch (err) {
    console.log(err)

  }
}

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


