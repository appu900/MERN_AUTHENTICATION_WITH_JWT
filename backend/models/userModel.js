const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type:String,
        required:[true,"please provide a username"]
    },
    email:{
        type:String,
        required:[true,"please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"please enter password"]
    }
})

module.exports = mongoose.model('users',userSchema);
