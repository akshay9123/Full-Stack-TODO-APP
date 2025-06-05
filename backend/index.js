import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import todoRoute from '../backend/routes/todo.routes.js'
import userRoute from '../backend/routes/user.routes.js'
import cors from 'cors'
import cookieParser from "cookie-parser";

dotenv.config()

const app = express()

// MIDDLEWARE
app.use(express.json())
app.use(cookieParser())
// app.use(cors({
//     origin:process.env.FRONTEND_URI,
//     credentials:true,
//     methods:"GET,POST,PUT,DELETE",
//     allowedHeaders:["Content-Type", "Authorization"]
// }))

app.use(cors())


// DATABASE CONNECTION INFO
try {
    await mongoose.connect(process.env.MONGO_URI)
    .then(console.log("Connected Successfully to databases "))
} catch (error) {
    console.log("error while connection")
}

app.get("/",(req,res)=>{
    res.send("Hello akshay, this is akshay jha this will be leutinent soon hii akshay")
})


// ROUTES
app.use("/todo", todoRoute)
app.use("/user", userRoute)


// SERVER RUNNING
app.listen(process.env.PORT,()=>{
    console.log("Server is Running")
})
