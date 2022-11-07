const route=require('express').Router()
const { sendMail } = require('../controller/mailController')
const mailController=require('../controller/mailController')

route.post(`/sendMail`,mailController.sendMail);

module.exports=route