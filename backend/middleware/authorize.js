import jwt from "jsonwebtoken"
import User from "../model/user.model.js"

export const authenticate = async(req,res,next) =>{
    const token = req.cookies.jwt
    
    if(!token) {
        return res.status(401).json({message : "Unauthorized"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = user; // Attach user to the request
    next(); // Important: call next only when everything is successful
    } catch (error) {
        return res.status(401).json({message : "" + error.message})
    }
    
}