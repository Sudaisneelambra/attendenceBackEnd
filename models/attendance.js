const mongoose = require('mongoose')

const attendanceSchema = mongoose.Schema({
    date:{
        type: String,
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    checkIn:{
        type:String,
        required:true        
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
    break:[breakSchema]
})

const breakSchema = new mongoose.Schema({
    breakStart: {
        type: String,
        required: true
    },
    breakEnd: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('attendence',attendanceSchema)