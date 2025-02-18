const mongoose = require("mongoose");

const Brandschema = new mongoose.Schema({
    ownername:{
        type:String,
        required:true,
    },
    brandname:{
        type:String,
        required:true,
        
    },
    phone:{
        type:Number,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }, 
    
},{collection:'brand'});


module.exports = mongoose.model('Brand',Brandschema);