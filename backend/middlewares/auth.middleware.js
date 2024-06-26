import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";


export const isLoggedIn = async (req,res, next) => {
  // console.log(isLoggedIn)
    // extracting token from the cookies
    const { token } = req.cookies;
    
  
    // If no token send unauthorized message
    if(!token) {
      return next(new AppError("token not exits, please login to continue", 401));
    }
  
    // Decoding the token using jwt package verify method
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  
    // If no decode send the message unauthorized
    if (!decoded) {
      return next(new AppError("Unauthorized, please login to continue", 401));
    }
  
    // If all good store the id in req object, here we are modifying the request object and adding a custom field user in it
    req.user = decoded;
  
    // Do not forget to call the next other wise the flow of execution will not be passed further
    next();
};
