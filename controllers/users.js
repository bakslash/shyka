const models = require('../models/index')
const returns = require('../returns/returns')

exports.getUsers = async(req,res, next)=>{
    try{
        console.log('getting users');
    const users = await models.users.findAll()
    console.log(users);
    await returns.successfullReturns(req,res,users)
    }catch(err){
        console.log(err);
    }
}
exports.addUsers = async(req,res,next)=>{
    try{
const users = await models.users.create({

    first_name:req.body.first_name,
    last_name:req.body.last_name,
    email:req.body.email,
    phone:req.body.phone,
    status:1,
    //password:req.body.phone,
})
console.log(users);
await returns.successfullReturns(req,res,users)
    }catch(err){
        console.log(err);
    }
}