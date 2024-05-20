import User from "../model/user.model.js";
import AppError from "../utils/appError.js";

// cookie for set 
const cookieOptions = {
    secure:true,
    maxAge: 10 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
  };

//   creating fucntion of register user
export const registgerUser = async(req,res,next)=>{
    const {firstName,lastName,phoneNumber,email,password} = req.body;
    
    if (!firstName || !lastName || !phoneNumber ||!email || !password) {
        return next(new AppError('All fields are required', 400));
    }
    
    const userExits = await User.findOne({email})

    if(userExits){
        return next(new AppError('Email already exits',400))
    }

    // saving data in databases
    const user = await User.create({
        firstName,
        lastName,
        phoneNumber,
        email,
        password,

    })

    if (!user) {
        return next(
          new AppError('User registration failed, please try again later', 400)
        );
    }
    
    await user.save();

    // Generating a JWT token
    const token = await user.generateJWTToken();

    res.cookie('token', token, cookieOptions);

    // uedefined because it can't sent to the user password to response 
    user.password = undefined;


    // when every thing is good then send res
    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user,
    });
}

// login 
export const loginUser = async (req,res,next)=>{

    const { email, password } = req.body;
  
  
    if (!email || !password) {
      return next(new AppError('Email and Password are required', 400));
    }
  
    // Finding the user with the sent email
    const user = await User.findOne({ email }).select('+password');
  
    // If no user or sent password do not match then send generic response
    if (!(user && (await user.comparePassword(password)))) {
      return next(
        new AppError('Email or Password do not match or user does not exist', 401)
      );
    }
  
  
    const token = await user.generateJWTToken();
  
    user.password = undefined;
  
    // Setting the token in the cookie with name token along with cookieOptions
    res.cookie('token', token, cookieOptions);
  
    // If all good send the response to the frontend
    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      user,
    });
  
}

// logout 
export const logoutUser = (req,res,next)=>{
    // Setting the cookie value to null
    res.cookie('token', null, {
        secure:true,
        maxAge: 0,
        httpOnly: true,
    })
}