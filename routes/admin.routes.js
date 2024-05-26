const express =require('express')
const router = express.Router()
const admin = require('../controllers/admin.controller')

router.post('/addEmplyee' , admin.addEmployee)

module.exports=router