const express =require('express')
const router=express.Router()
const validations = require('../middleware/verifyRegister')
const authController = require('../controllers/auth')



router.post('/signup',validations.checkDuplicateEmail,authController.signup)
router.post('/signin',authController.signin)


module.exports =router