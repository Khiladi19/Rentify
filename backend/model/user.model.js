
import {Schema,model} from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


const userSchema = new Schema({
    firstName:{
        type:String,
        required:[true,'Name is required'],
        minLength:[5,'Name must be 5 char'],
        maxLength:[50,'Name must be less than 50 char'],
        lowercase:true,
        trim:true
    },

    lastName: {
        type: String,
        required:[true,'LastName is required'],
        minLength:[5,'Name must be 5 char'],
        maxLength:[50,'Name must be less than 50 char'],
        lowercase:true,
        trim:true
      },

    phoneNumber: {
        type: String,
        required: [true,'Phone number is required'],
        trim: true
    },

    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
        lowercase:true,
        unique:[true,'already registered'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please fill in a valid email address',
          ], // Matches email against regex

    },
    password:{
        type:String,
        required:[true,'Password is required'],
        minLength:[8,'Your Passwords must be atlest 8 char'],
        select:false
    },

    userType: {
        type: String,
        required: true,
        enum: ['Buyer', 'Seller'],
        default: 'Buyer'
      },

},{
    timestamps:true
})

// Hashes password before saving to the database
userSchema.pre('save', async function (next) {
    // If password is not modified then do not hash it
    if (!this.isModified('password')) return next();
  
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods = {
    // method which will help us compare plain password with hashed password and returns true or false

    comparePassword: async function (plainPassword) {
      return await bcrypt.compare(plainPassword, this.password);
    },
  

    // Will generate a JWT token with user id as payload
    generateJWTToken: async function () {
      return await jwt.sign(
        { id: this._id},
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRY,
        }
      );
    },


};



const User = model('User',userSchema);
export default User;