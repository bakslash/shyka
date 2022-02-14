const express =require('express')
const router=express.Router()
const userController = require('../controllers/users')
const verifyController = require('../middleware/authJwt')



router.get('/',verifyController.verifyToken, userController.getUsers)


module.exports =router