const express =require('express')
const router = express.Router()

const tockenCheck = require('../middleware/tockencheck')

const employee = require('../controllers/employee.controller')

router.post('/checkIn' ,tockenCheck, employee.checkIn)
router.get('/checkCheckin' ,tockenCheck, employee.checkCheckin)
router.post('/checkOut' ,tockenCheck, employee.checkOut)
router.post('/takeBreak' ,tockenCheck, employee.takeBreak)
router.get('/breakCheck' ,tockenCheck, employee.breakCheck)
router.post('/breakEnd' ,tockenCheck, employee.breakEnd)
router.post('/leaveRequest' ,tockenCheck, employee.leaveRequest)

module.exports=router
