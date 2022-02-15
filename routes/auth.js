const express =require('express')
const router=express.Router()
const validations = require('../middleware/verifyRegister')
const authController = require('../controllers/auth')



router.post('/signup',validations.checkDuplicateEmail,authController.signup)
router.post('/signin',authController.signin)
router.post('/reset_password',authController.resetPassword)
router.post('/update_password',authController.updatePassword)


module.exports =router