const express =require('express')
const router = express.Router()

const tockenCheck = require('../middleware/tockencheck')

const employee = require('../controllers/employee.controller')

router.post('/checkIn' , tockenCheck, employee.checkIn)

module.exports=router