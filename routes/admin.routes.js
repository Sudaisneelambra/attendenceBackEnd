const express =require('express')
const router = express.Router()

const tockenCheck = require('../middleware/tockencheck')

const admin = require('../controllers/admin.controller')

router.post('/addEmplyee' , tockenCheck, admin.addEmployee)

module.exports=router