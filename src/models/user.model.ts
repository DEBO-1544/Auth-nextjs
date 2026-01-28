import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
    },
   
    
    verifyToken: {
        type: String,
    },
    
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    Forgotpassword:{
        type:Boolean,
        default:false,
    }
    
},{
    timestamps:true
})

export const User =mongoose.models.User || mongoose.model("User", userSchema)