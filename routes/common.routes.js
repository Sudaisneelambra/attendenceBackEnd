const express =require('express')
const router = express.Router()
const common = require('../controllers/common.controller')

router.post('/login' , common.commonLogin)

module.exports=router