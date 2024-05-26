const mongoose = require('mongoose')

const loginSchema = mongoose.Schema({
    email:{
        type: String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true        
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    },
    blockStatus:{
        type:Boolean,
        required:true,
        default:false
    }
})

module.exports = mongoose.model('users',loginSchema)