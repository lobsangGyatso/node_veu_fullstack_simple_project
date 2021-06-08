
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({


    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    passwordHash:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default: false  
    },
     street:{
        type:String,
        default: ''
    },
     apartment:{
        type:String,
        default: ''
    },
    zip:{
        type:String,
        default: ''
    },
    city:{
        type:String,
        default: ''
    }
})

userSchema.pre("save", async function(next) {
    console.log("endcyrpsfsd")
    if(this.isModified("passwordHash")){
        this.passwordHash = await bcrypt.hash(this.passwordHash, 10)
        console.log(this.passwordHash)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User