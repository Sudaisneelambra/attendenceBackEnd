const express =require('express')
const router = express.Router()

const tockenCheck = require('../middleware/tockencheck')

const admin = require('../controllers/admin.controller')

router.post('/addEmplyee' , tockenCheck, admin.addEmployee)
router.get('/showEmployees',tockenCheck , admin.showUser)
router.patch('/changeStatus',tockenCheck, admin.blockAndUnblockEmployee)


module.exports=router