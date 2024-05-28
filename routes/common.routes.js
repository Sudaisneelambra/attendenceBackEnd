const express =require('express')
const router = express.Router()
const common = require('../controllers/common.controller')
const tokenCheck = require('../middleware/tockencheck')

router.post('/login' , common.commonLogin)
router.get('/getAttendence' ,tokenCheck, common.getAttendence)

module.exports=router