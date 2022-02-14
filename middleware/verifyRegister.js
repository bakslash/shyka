const model = require("../models");
const returns = require('../returns/returns')
const ROLES = model.ROLES;

exports.checkDuplicateEmail = async (req, res, next) => {
  try {
    console.log('duplicate test');
    // Email
    const user = await model.users.findOne({
      where: {
        email: req.body.email
      }
    })
    if (user) {
      console.log('existing email',user);
      await returns.EmailvalidationErrors(req, res)
    }
    next();

  } catch (err) {
    console.log(err);
  }
};

exports.checkRolesExisted = (req, res, next) => {

  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!model.roles.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }

  next();
};
