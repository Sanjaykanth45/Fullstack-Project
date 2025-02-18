const mongoose = require("mongoose");

const Userschema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        default:"user"
    }
},{collection:'users'});


module.exports = mongoose.model('User',Userschema);