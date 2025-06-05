import User from "../model/user.model.js"
import bcrypt from 'bcrypt'
import {z} from 'zod'
import { generateTokenAndSaveInCookies } from "../jwt/token.js"



const userSchma = z.object({
    email:z.string().email({message:"Invalid Email"}),
    username: z.string().min(3,{message:"Username must atleast 3 character"}).max(20,{message:"Username upto 20 character"}),
    password:z.string().min(8,{message:"Password atleast 8 character"}).max(20,{message:"Password upto only 8 character"})
})



export const register = async(req,res) =>{
    const {username, email, password} = req.body;
    const emailLower = email?.toLowerCase();

    try {
        if(!username || !email || !password){
            return res.status(400).json({
                msg:"All fields are required"
            });
        }

        const validatation = userSchma.safeParse({username, email: emailLower, password});
        if(!validatation.success){
            return res.status(400).json({
                msg: validatation.error.errors
            });
        }

        const existUser = await User.findOne({ email: emailLower });
        if(existUser){
            return res.status(409).json({
                msg: "User is already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email: emailLower, password: hashedPassword });

        const token = await generateTokenAndSaveInCookies(user._id, res);

        res.status(200).json({
            msg:"User Registered Successfully",
            user,
            token
        });

    } catch (error) {
        console.error(error);

        if (error.code === 11000) {
            return res.status(409).json({
                msg: "User is already registered"
            });
        }

        return res.status(500).json({
            msg: "Error in the Register user controller"
        });
    }
}


export const login = async(req,res) =>{
    
    const {email, password} = req.body;

    try {
        
        if(!email || !password) {
            return res.status(400).json({
                msg:"All fields are required"
            })
        }

        const exist = await User.findOne({email}).select("+password")

        if(!exist){
            return res.status(409).json({
                msg:"User is not existing, you have to Register",
            })
        }

        const matchPassword = await bcrypt.compare(password, exist.password)

        if(!matchPassword){
            res.status(409).json({
                msg:"Password is incorrect",
            })
        }


        const token= await generateTokenAndSaveInCookies(exist._id,res)


        res.status(200).json({
            msg:"User Logged In Successfully",
            token
            
        })

    } catch (error) {
        // IF ANY ERROR WILL ENCOUNTER THEN THE RESPONSE WILL GET 500 STATUS CODE THAT MEANS THERE IS AN ERROR
        console.error(error); 
        return res.status(500).json({
            msg: "Error in the Login user controller"
        });
    }
}

export const logout = async(req,res) =>{
    
    try {

        res.clearCookie("jwt",{
            httpOnly:true,
            secure:false,
            path:"/"
        })
        
        res.status(200).json({msg:"User logout successfully"})
        
    } catch (error) {
        // IF ANY ERROR WILL ENCOUNTER THEN THE RESPONSE WILL GET 500 STATUS CODE THAT MEANS THERE IS AN ERROR
        console.error(error); 
        return res.status(500).json({
            msg: "Error in the Logout user controller"
        });
    }
}