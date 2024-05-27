const mongoose = require('mongoose')

const breakSchema = new mongoose.Schema({
    breakStart: {
        type: String,
        required: true
    },
    breakEnd: {
        type: String,
    },
    duration: {
        type: String,
    }
});

const attendanceSchema = mongoose.Schema({
    date:{
        type: String,
        required:true
    },
    employeeId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    checkIn:{
        type:String,       
    },
    checkOut:{
        type:String,
    },
    isLate: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        required: true,
        enum: ['present', 'late', 'leave'],
    },
    workingHours: {
        type:String,
    },
    break:[breakSchema]
})

module.exports = mongoose.model('attendence',attendanceSchema)