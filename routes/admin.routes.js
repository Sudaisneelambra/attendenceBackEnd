const express =require('express')
const router = express.Router()

const tockenCheck = require('../middleware/tockencheck')

const admin = require('../controllers/admin.controller')

router.post('/addEmplyee' , tockenCheck, admin.addEmployee)
router.get('/showEmployees',tockenCheck , admin.showEmployee)
router.patch('/changeStatus',tockenCheck, admin.blockAndUnblockEmployee)
router.get('/showRequest',tockenCheck , admin.showRequest)
router.get('/getSingleEmployeeDetail/:id',tockenCheck , admin.getSingleEmployeeDetail)


module.exports=router
