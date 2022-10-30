const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    email : {
        type: String,
        required : true,
        unique : true,
        validate : (value)=>{
            return validator.isEmail(value);
        }
    },
    password :{
        type: String,
        required : true,
        
    },
    expenses : [{
        title : String,
        description: String,
        cost : Number,
        tax : Number,
        total : Number,
        DateAdded : Date
    }]
},{timestamps:true});

module.exports = mongoose.model('user', userSchema);