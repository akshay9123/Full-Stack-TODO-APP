import mongoose from "mongoose";

const TodoSchme = new mongoose.Schema({
    text:{
        type: String,
        required:true
    },
    completed:{
        type:Boolean,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User", // refrencing the user model to connect to users collection in MONGODB
        required:true
    }
})

const Todo = mongoose.model("Todo", TodoSchme)

export default Todo