import mongoose from 'mongoose'

const userSchma = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    token:{
        type:String
    }
})

const User = mongoose.model("User", userSchma)
export default User