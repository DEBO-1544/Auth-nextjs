import { NextRequest, NextResponse } from "next/server";
import {User}from "@/models/user.model";
import connectToDB from "@/dbgonfig/db_conncetion";
import {Forggotpassword} from "@/helpers/forgotpass";
import { ApiError } from "@/helpers/apierror";
import { ApiRes } from "@/helpers/apiresponse";
import jwt from "jsonwebtoken"
export async function POST(request: NextRequest) {
    try {
        await connectToDB()
        const {email} = await request.json()
        const user = await User.findOne({email})
        if(!user){
            throw new ApiError(404,"User not found")
        }
        const ForgotpasswordToken=jwt.sign({id:user._id},process.env.Forgotpassword_TOKEN_SECRET!,{expiresIn:process.env.Forgotpassword_TOKEN_EXPIRY})
        if(!ForgotpasswordToken){
            throw new ApiError(500,"Failed to generate token")
        }
        
        user.Forgotpassword=true
        await user.save({validateBeforeSave:false})
        const sendmail=await Forggotpassword(user.email, user._id,user.fullname)
        if(!sendmail){
            throw new ApiError(500,"Failed to send email")
        }
        const response= NextResponse.json(new ApiRes(200, "Forgot password email sent successfully"),{status:200})
         response.cookies.set("ForgotpasswordToken",ForgotpasswordToken,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:"strict",
            maxAge:15*60*1000
         })
         return response
    } catch ( error:any) {
        return NextResponse.json(new ApiError(500,error.message),{status:500})
    }
}